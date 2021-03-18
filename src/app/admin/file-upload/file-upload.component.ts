import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {ApiService} from "../../shared/services/api.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  imageFile: any = '';
  acceptedFileTypes: any;
  private validImageTypes: Array<string> = ['image/png', 'image/jpeg'];

  selectedFile: File;
  showFileList = false;
  progress = 0;

  submitted = false;
  imageUploadForm: FormGroup;

  @Input() productCode = null;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private snackBar: MatSnackBar,
              private apiService: ApiService) { }

  ngOnInit(): void {
  }

  fileChangeEvent(event): void {
    if (event instanceof DragEvent) {
      this.selectedFile = event.dataTransfer.files[0];
    } else {
      if (event.target.files.length > 0) {
        this.selectedFile = event.target.files[0];
      }
    }

    // Check if filetype is valid
    if (this.validImageTypes.includes(this.selectedFile.type)) {
      this.showFileList = false;
      this.imageFile = this.selectedFile;
    } else {
      this.selectedFile = undefined;
      this.snackBar.open('Invalid file type', 'Close', {duration: 2000});
      return;
    }

    if (this.selectedFile.type.includes('image')) {
    } else {
    }
  }

  onUpload(): void {
    this.submitted = true;
    if (!this.imageUploadForm.valid || !this.productCode) {
      return;
    }

    const uploadData = new FormData();
    uploadData.append('imageCode', this.imageUploadForm.controls.imageCode.value);
    uploadData.append('imageSize', this.imageUploadForm.controls.imageSizes.value);
    uploadData.append('file', this.selectedFile, this.selectedFile.name);
    this.apiService.uploadProductImage(this.productCode, uploadData).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          if (event.body) {
            if (event.body.error) {
              this.snackBar.open(event.body.responseMessage, 'Close', {duration: 2000});
              setTimeout(() => {
                this.progress = 0;
                this.activeModal.close('Close click');
              }, 500);
            } else {
              this.snackBar.open('Image uploaded successfully!', 'Close', {duration: 2000});
              setTimeout(() => {
                this.progress = 0;
                this.activeModal.close('Close click');
              }, 1500);
            }
          }
      }
    },
    () => {
      this.progress = 0;
      this.snackBar.open('Error while uploading image', 'Close', {duration: 2000});
    });
  }
}
