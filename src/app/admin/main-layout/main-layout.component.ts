import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {ChangePasswordComponent} from "../../home/profile/change-password/change-password.component";

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

  constructor(public mediaObserver: MediaObserver, private router: Router, private authService: AuthService,
              private modalService: NgbModal) {
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

  navigate(path): void {
    this.router.navigate([path]).then(() => {});
  }

  openModal(): void {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      scrollable: false,
      centered: true
    };

    const modalRef = this.modalService.open(ChangePasswordComponent, ngbModalOptions);
    modalRef.componentInstance.role = 'ADMIN';
    modalRef.componentInstance.email = this.authService.getAdminProfile().email;
    modalRef.result.then(() => {
    }).catch(() => {
    });
  }

}
