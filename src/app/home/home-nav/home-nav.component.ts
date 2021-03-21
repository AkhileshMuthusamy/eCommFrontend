import {Component, OnInit} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {Router} from '@angular/router';
import {NavItem} from './nav-item';
import {AuthService} from '../../shared/services/auth.service';
import {ApiService} from '../../shared/services/api.service';
import {Category} from '../../shared/Objects/global-obj';
import {UserDataService} from '../../shared/services/user-data.service';
import {FormControl, Validators} from "@angular/forms";

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
  cartCount = 0;

  navItems: NavItem[] = [];

  search = new FormControl(null, [Validators.required]);

  constructor(private router: Router, public mediaObserver: MediaObserver, private authService: AuthService,
              private apiService: ApiService, private userDataService: UserDataService) {
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

    this.userDataService.cartListSubject.subscribe((cartList) => {
      let qty = 0;
      cartList.forEach(prd => {
        qty += prd.quantity;
      });
      this.cartCount = qty;
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
            child: category.child.length > 0 ? this.getChildDetails(response.data, category.child) : [],
            id: category._id
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
          child = child.concat([{
            menu: cat.name,
            child: cat.child.length > 0 ? this.getChildDetails(catList, cat.child) : [],
            id: cat._id}]);
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
