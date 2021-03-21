import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../shared/services/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../../shared/Objects/global-obj';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  isLoading = false;

  categoryList: Array<Category> = [];
  selectedFiles: FileList;

  constructor(public activeModal: NgbActiveModal, private apiService: ApiService, private snackBar: MatSnackBar,
              private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      SKU: ['', [Validators.required]],
      category: [null],
      description: [''],
      sellingPrice: [100.0, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.productForm.controls[controlName];
    if (!control) {
      return false;
    }

    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe(response => {
      if (!response.error) {
        this.categoryList = response.data.filter(category => {
          return  category.child.length === 0;
        });
      }
    });
  }

  addProduct(): void {
    if (this.productForm.valid) {
      this.isLoading = true;

      const formData = new FormData();

      if (this.selectedFiles?.length > 0) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('allfile', this.selectedFiles.item(i));
        }
      }
      const {name, SKU, category, description, sellingPrice} = this.productForm.getRawValue();
      formData.append('name', name);
      formData.append('SKU', SKU);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('sellingPrice', sellingPrice);

      this.apiService.addProduct(formData).subscribe(response => {
        this.isLoading = false;
        if (!response.error) {
          this.snackBar.open(response.message || 'Product added successfully!', 'Close', {duration: 2000});
          this.activeModal.close();
        }
      }, () => {
        this.isLoading = false;
      });
    }
  }

  fileChangeEvent(event): void {
    if (event instanceof DragEvent) {
      this.selectedFiles = event.dataTransfer.files;
    } else {
      if (event.target.files.length > 0) {
        this.selectedFiles = event.target.files;
      }
    }
  }

}
