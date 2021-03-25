import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {ApiService} from '../../shared/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLoading = false;
  dashboard = null;

  constructor(private authService: AuthService, private router: Router, private apiService: ApiService) {
    this.authService.isAdminLoginSubject.subscribe(value => {
        if (!value) {
          this.router.navigate(['/admin/login']).then(() => {});
        }
    });
  }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.isLoading = true;
    this.apiService.getDashboard().subscribe(response => {
      this.isLoading = false;
      if (!response.error) {
        this.dashboard = response.data;
      }
    }, () => {
      this.isLoading = false;
    });
  }

}
