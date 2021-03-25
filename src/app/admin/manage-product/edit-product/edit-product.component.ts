import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../../shared/Objects/global-obj';
import {ApiService} from '../../../shared/services/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  @Input() productInfo = null;
  productForm: FormGroup;
  isLoading = false;

  categoryList: Array<Category> = [];
  selectedFiles: FileList;

  constructor(public activeModal: NgbActiveModal, private apiService: ApiService, private snackBar: MatSnackBar,
              private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      SKU: [{value: '', disabled: true}, [Validators.required]],
      category: [null],
      description: [''],
      sellingPrice: [100.0, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.productForm.patchValue(this.productInfo);
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

  editProduct(): void {
    if (this.productForm.valid) {
      this.isLoading = true;

      const formData = new FormData();

      if (this.selectedFiles?.length > 0) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('allfile', this.selectedFiles.item(i));
        }
      }
      const {name, SKU, category, description, sellingPrice} = this.productForm.getRawValue();
      formData.append('_id', this.productInfo._id);
      formData.append('name', name);
      formData.append('SKU', SKU);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('sellingPrice', sellingPrice);

      this.apiService.editProduct(formData).subscribe(response => {
        this.isLoading = false;
        if (!response.error) {
          this.snackBar.open(response.message || 'Product updated successfully!', 'Close', {duration: 2000});
          this.activeModal.close();
        }
      }, () => {
        this.isLoading = false;
      });
    }
  }

  deleteImage(imageId: string, index): void {
    console.log(imageId);
    const data = {
      _id: this.productInfo._id,
      imageId
    };
    this.apiService.deleteProductImage(data).subscribe(response => {
      if (!response.error) {
        this.productInfo.images.splice(index, 1);
      }
    });
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
