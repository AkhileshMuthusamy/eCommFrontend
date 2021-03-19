import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../shared/services/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Category} from '../../shared/Objects/global-obj';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {AddEditCategoryComponent} from './add-edit-category/add-edit-category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {

  isLoading = false;

  categoryList: Array<Category> = [];
  container1 = [];
  container2 = [];
  container3 = [];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.apiService.getCategories().subscribe(response => {
        this.isLoading = false;
        if (!response.error) {
          this.categoryList = response.data;
        } else {
          this.snackBar.open(response.message || 'Error while loading category', 'Close', {duration: 2000});
        }
    }, () => {
      this.isLoading = false;
    });
  }

  openModal(data, isEdit): void {

    if (!isEdit) {
      data = {
        parent_id: '0',
      };
    }

    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      scrollable: false,
      centered: true
    };

    const modalRef = this.modalService.open(AddEditCategoryComponent, ngbModalOptions);
    modalRef.componentInstance.isEdit = isEdit;
    modalRef.componentInstance.formData = {...data};
    modalRef.result.then(() => {
      this.loadCategories();
    }).catch(() => {
    });

  }

  deleteCategory({_id, child}: Category): void {
    if (child.length > 0) {
      this.snackBar.open('🚫 Please delete the sub level category', 'Close', {duration: 2000});
      return;
    }
    this.isLoading = true;
    this.apiService.deleteCategory(_id).subscribe(response => {
      this.isLoading = false;
      if (!response.error) {
        this.snackBar.open(response.message || 'Category deleted successfully!', 'Close', {duration: 2000});
        this.loadCategories();
      }
    }, () => {
      this.isLoading = false;
    });
  }
}
