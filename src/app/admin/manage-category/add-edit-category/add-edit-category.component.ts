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
      console.log(this.categoryName.value);
      this.formData.name = this.categoryName.value;
      this.apiService.addCategory(this.formData).subscribe(response => {
        this.isLoading = false;
        this.snackBar.open(response.message || 'Category added successfully!', 'Close', {duration: 2000});
        this.activeModal.close();
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

}
