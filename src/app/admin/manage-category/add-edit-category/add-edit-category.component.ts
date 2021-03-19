import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, Validators} from '@angular/forms';
import {ApiService} from '../../../shared/services/api.service';
import {Category} from '../../../shared/Objects/global-obj';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {

  submitted = false;
  isLoading = false;

  categoryName = new FormControl(null, [Validators.required]);

  @Input() parentData: Category = null;
  @Input() formData: Category = null;
  @Input() isEdit = false;

  constructor(public activeModal: NgbActiveModal, private apiService: ApiService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.categoryName.setValue(this.formData.name);
    }
  }

  onSave(): void {
    if (this.isEdit) {
      this.updateCategory();
    } else {
      this.addCategory();
    }
  }

  addCategory(): void {
    if (this.categoryName.valid) {
      this.isLoading = true;

      this.formData.name = this.categoryName.value;
      this.formData.parent_id = this.parentData._id;

      this.apiService.addCategory(this.formData).subscribe(response => {
        this.isLoading = false;
        if (response.data && this.parentData._id !== '0') {
          this.updateCategoryChild(response.data);
        } else {
          this.snackBar.open(response.message || 'Category added successfully!', 'Close', {duration: 2000});
          this.activeModal.close();
        }
      }, () => {
        this.isLoading = false;
      });
    }
  }

  updateCategory(): void {
    if (this.categoryName.valid) {
      this.isLoading = true;
      const data = {
        _id: this.formData._id,
        data: {
          name: this.categoryName.value
        }
      };
      this.apiService.updateCategory(data).subscribe(response => {
        this.isLoading = false;
        this.snackBar.open(response.message || 'Category updated successfully!', 'Close', {duration: 2000});
        this.activeModal.close();
      }, () => {
        this.isLoading = false;
      });
    }
  }

  updateCategoryChild({_id}): void {
    if (this.parentData.child) {
      this.isLoading = true;
      const data = {
        _id: this.parentData._id,
        data: {
          child: this.parentData.child.concat([_id])
        }
      };
      console.log(data);
      this.apiService.updateCategory(data).subscribe(response => {
        this.isLoading = false;
        this.snackBar.open(response.message || 'Category added successfully!', 'Close', {duration: 2000});
        this.activeModal.close();
      }, () => {
        this.isLoading = false;
      });
    }
  }

}
