import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  sideMenuMode: 'over' | 'side' = 'over';
  sideMenuOpened = false;
  showMenuLabel = true;
  showMenu = true;

  constructor(public mediaObserver: MediaObserver, private router: Router, private authService: AuthService) {
    mediaObserver.asObservable().subscribe((mediaChange) => {
     const screen = mediaChange[0].mqAlias;
     if (screen === 'xs') {
      this.sideMenuMode = 'over';
      this.sideMenuOpened = false;
      this.showMenuLabel = true;
     } else {
      this.sideMenuMode = 'side';
      this.sideMenuOpened = true;
     }
    });

    this.authService.isAdminLoginSubject.subscribe(value => {
        this.showMenu = value;
    });
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.adminLogout();
  }

}
