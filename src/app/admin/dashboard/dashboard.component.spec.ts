import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {ActivatedRoute, Routes} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {HomeComponent} from '../../home/home.component';
import {HomeProductsComponent} from '../../home-products/home-products.component';
import {ProfileComponent} from '../../home/profile/profile.component';
import {ProductDetailsComponent} from '../../product-details/product-details.component';
import {MyCartComponent} from '../../home/my-cart/my-cart.component';
import {CheckoutComponent} from '../../home/checkout/checkout.component';
import {MyOrderComponent} from '../../home/my-order/my-order.component';
import {CategoryProductsComponent} from '../../home/category-products/category-products.component';
import {SearchProductsComponent} from '../../home/search-products/search-products.component';
import {LoginComponent} from '../../home/login/login.component';
import {RegisterComponent} from '../../home/register/register.component';
import {MainLayoutComponent} from '../main-layout/main-layout.component';
import {AdminLoginComponent} from '../admin-login/admin-login.component';
import {ManageCategoryComponent} from '../manage-category/manage-category.component';
import {ManageProductComponent} from '../manage-product/manage-product.component';
import {ManageOrderComponent} from '../manage-order/manage-order.component';
import {ManageUserComponent} from '../manage-user/manage-user.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'product'
      },
      {
        path: 'product',
        component: HomeProductsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'product-detail/:id',
        component: ProductDetailsComponent
      },
      {
        path: 'cart',
        component: MyCartComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      },
      {
        path: 'order',
        component: MyOrderComponent
      },
      {
        path: 'category/:id',
        component: CategoryProductsComponent
      },
      {
        path: 'search/:s',
        component: SearchProductsComponent
      },
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'admin', component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {path: 'login', component: AdminLoginComponent},
      {path: 'category', component: ManageCategoryComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'product', component: ManageProductComponent},
      {path: 'order', component: ManageOrderComponent},
      {path: 'user', component: ManageUserComponent},
  ]},
  {path: '**', redirectTo: ''}
];

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes),
      BrowserAnimationsModule,
      FlexLayoutModule,
      MatBadgeModule,
      MatButtonModule,
      MatCardModule,
      MatCheckboxModule,
      MatDividerModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatPaginatorModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatSelectModule,
      MatSidenavModule,
      MatSnackBarModule,
      MatSortModule,
      MatStepperModule,
      MatTableModule,
      MatToolbarModule,
      MatTooltipModule,
      ReactiveFormsModule,
      ],
      providers: [
        MatSnackBar,
        {
          provide: ActivatedRoute,
          useValue: {
              snapshot: {
                  paramMap: {
                      get(): string {
                          return '123';
                      },
                  },
              },
          },
        }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
