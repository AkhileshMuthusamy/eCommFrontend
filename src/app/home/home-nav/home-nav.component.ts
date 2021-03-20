import {Component, OnInit} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {Router} from '@angular/router';
import {NavItem} from './nav-item';
import {AuthService} from '../../shared/services/auth.service';
import {ApiService} from '../../shared/services/api.service';
import {Category} from '../../shared/Objects/global-obj';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss']
})
export class HomeNavComponent implements OnInit {

  showMenuLabel = true;
  objectKeys = Object.keys;
  showLogin = false;
  profile = null;

  navItems: NavItem[] = [];

  constructor(private router: Router, public mediaObserver: MediaObserver, private authService: AuthService,
              private apiService: ApiService) {
    mediaObserver.asObservable().subscribe((mediaChange) => {
      const screen = mediaChange[0].mqAlias;
      if (screen === 'xs') {
       this.showMenuLabel = true;
      } else {
      }
     });

    this.authService.isLoginSubject.subscribe(value => {
      this.showLogin = !value;
      if (value) {
        this.profile = this.authService.getProfile();
        console.log(this.profile);
      }
    });
  }

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu(): void {
    this.apiService.getCategories().subscribe(response => {
      response.data.forEach(category => {
        if (category.parent_id === '0') {
          this.navItems = this.navItems.concat([{
            menu: category.name,
            child: category.child.length > 0 ? this.getChildDetails(response.data, category.child) : []
          }]);
        }
      });
    });
  }

  getChildDetails(catList: Array<Category>, childIds: Array<string>): any {
    let child = [];
    childIds.forEach(childId => {
      catList.forEach(cat => {
        if (cat._id === childId) {
          child = child.concat([{menu: cat.name, child: cat.child.length > 0 ? this.getChildDetails(catList, cat.child) : []}]);
        }
      });
    });
    return child;
  }

  navigate(path): void {
    this.router.navigate([path]).then(() => {});
  }

  logout(): void {
    this.authService.logout();
  }

  login(): void {
    this.router.navigate(['/login']).then(() => {});
  }

}
