import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ShipOrderComponent} from './ship-order/ship-order.component';
import { AdminOrderDetailComponent } from './admin-order-detail.component';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';

describe('AdminOrderDetailComponent', () => {
  let component: AdminOrderDetailComponent;
  let fixture: ComponentFixture<AdminOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrderDetailComponent, ShipOrderComponent ],
      imports: [
        NgbModule,
        HttpClientTestingModule,
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
        NgbActiveModal,
        NgbModal,
        MatSnackBar
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderDetailComponent);
    component = fixture.componentInstance;
    component.data = {
      status: 'SHIPPED',
      products: [
        {
          _id: '604c0731dd90e04c5c8438d2',
          name: 'Greatindos Premium Quality Calcium Nitrate Fertilizer For Plants',
          quantity: 1,
          sellingPrice: 2500.99,
          grandPrice: 2500.99,
          rating: 1,
          title: 'Cheap Product [Edited]',
          message: 'The quality is very worst'
        }
      ],
      _id: '60563c2ae441d85038f7b780',
      totalAmount: 2500.99,
      email: 'akhileshmuthusamy@gmail.com',
      payment: {
        _id: '60563c2ae441d85038f7b781',
        type: 'COD',
        cardNo: '',
        name: ''
      },
      shippingAddress: {
        _id: '60563c2ae441d85038f7b782',
        address: '102/2 Asfdhggkjljklljk, hjluyiuhkjhkhkj',
        postcode: '9875656',
        city: 'Erode',
        state: 'India',
        country: 'India',
        phone: '+918220104402'
      },
      orderDate: '2021-03-20T18:17:14.641Z',
      __v: 0,
      shipDate: '2021-03-26T23:32:13.601Z',
      trackingNumber: '1486432'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
