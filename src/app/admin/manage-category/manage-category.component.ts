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
  container2: Array<Category> = [];
  container3: Array<Category> = [];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  containerClick(level, id): void {
    if (level === 0) {
      this.container2 = this.categoryList.filter(category => {
        return category.parent_id === id;
      });
    } else {
      this.container3 = this.categoryList.filter(category => {
        return category.parent_id === id;
      });
    }
  }

  loadCategories(): void {
    this.isLoading = true;
    this.apiService.getCategories().subscribe(response => {
        this.isLoading = false;
        if (!response.error) {
          this.categoryList = response.data;
          this.container2 = [];
          this.container3 = [];
        } else {
          this.snackBar.open(response.message || 'Error while loading category', 'Close', {duration: 2000});
        }
    }, () => {
      this.isLoading = false;
    });
  }

  openModal(parentData, data, isEdit): void {

    if (!parentData) {
      parentData = {
        _id: '0'
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
    modalRef.componentInstance.parentData = {...parentData};
    modalRef.result.then(() => {
      this.loadCategories();
    }).catch(() => {
    });

  }

  deleteCategory(parentData, {_id, child}: Category): void {
    if (!parentData) {
      parentData = {
        _id: '0'
      };
    }

    if (child.length > 0) {
      this.snackBar.open('🚫 Please delete the sub level category', 'Close', {duration: 2000});
      return;
    }
    this.isLoading = true;
    this.apiService.deleteCategory(_id).subscribe(response => {
      this.isLoading = false;
      if (!response.error && parentData._id !== '0') {
        this.updateCategoryChild(parentData, _id);
      } else {
        this.snackBar.open(response.message || 'Category deleted successfully!', 'Close', {duration: 2000});
        this.loadCategories();
      }
    }, () => {
      this.isLoading = false;
    });
  }

  updateCategoryChild(parentData, id): void {
    if (id) {
      this.isLoading = true;
      parentData.child.splice(parentData.child.indexOf(id), 1);
      const data = {
        _id: parentData._id,
        data: {
          child: parentData.child
        }
      };
      console.log(data);
      this.apiService.updateCategory(data).subscribe(response => {
        this.isLoading = false;
        this.snackBar.open(response.message || 'Category deleted successfully!', 'Close', {duration: 2000});
        this.loadCategories();
      }, () => {
        this.isLoading = false;
      });
    }
  }
}
