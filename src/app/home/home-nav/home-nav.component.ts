import {Component, OnInit} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {Router} from '@angular/router';
import {NavItem} from './nav-item';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss']
})
export class HomeNavComponent implements OnInit {

  showMenuLabel = true;
  objectKeys = Object.keys;

  navItems: NavItem[] =  [
    {
        "menu": "Fertilizers",
        "child": [
            {
                "menu": "Biological Fertilizers",
                "child": [
                  {
                    "menu": "Fertilizers2",
                    "child": []
                  }
                ]
            },
            {
                "menu": "Organic Fertilizers",
                "child": []
            },
            {
                "menu": "Chemical Fertilizers",
                "child": []
            }
        ]
    },
    {
        "menu": "Remedies",
        "child": [
            {
                "menu": "Bio Pesticides",
                "child": []
            },
            {
                "menu": "Insecticides",
                "child": []
            },
            {
                "menu": "Herbicides",
                "child": []
            }
        ]
    },
    {
        "menu": "Irrigation",
        "child": []
    }
  ];

  constructor(private router: Router, public mediaObserver: MediaObserver,) {
    mediaObserver.asObservable().subscribe((mediaChange) => {
      const screen = mediaChange[0].mqAlias;
      if (screen === 'xs') {
       this.showMenuLabel = true;
      } else {
      }
     });
  }

  ngOnInit(): void {
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
