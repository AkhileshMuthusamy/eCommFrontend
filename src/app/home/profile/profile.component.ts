import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isEdit = false;
  profile = null;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.profileForm = this.fb.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['USER']
    });
  }

  ngOnInit(): void {
    this.profileForm.patchValue(this.authService.getProfile());
    this.profileForm.disable();
  }

}
