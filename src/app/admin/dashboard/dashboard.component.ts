import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAdminLoginSubject.subscribe(value => {
        if (!value) {
          this.router.navigate(['/admin/login']).then(() => {});
        }
    });
  }

  ngOnInit(): void {
  }

}
