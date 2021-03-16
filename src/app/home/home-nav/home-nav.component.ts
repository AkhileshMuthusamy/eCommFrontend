import {Component, OnInit} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {Router} from '@angular/router';
import {NavItem} from './nav-item';
import {AuthService} from '../../shared/services/auth.service';

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

  navItems: NavItem[] =  [
    {
        menu: 'Fertilizers',
        child: [
            {
                menu: 'Biological Fertilizers',
                child: [
                  {
                    menu: 'Fertilizers2',
                    child: []
                  }
                ]
            },
            {
                menu: 'Organic Fertilizers',
                child: []
            },
            {
                menu: 'Chemical Fertilizers',
                child: []
            }
        ]
    },
    {
        menu: 'Remedies',
        child: [
            {
                menu: 'Bio Pesticides',
                child: []
            },
            {
                menu: 'Insecticides',
                child: []
            },
            {
                menu: 'Herbicides',
                child: []
            }
        ]
    },
    {
        menu: 'Irrigation',
        child: []
    }
  ];

  constructor(private router: Router, public mediaObserver: MediaObserver, private authService: AuthService) {
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
