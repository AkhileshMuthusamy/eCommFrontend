import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {APIResponse} from '../Objects/api-response';
import {Category, Product} from '../Objects/global-obj';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiURL: string;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getDashboard(): Observable<APIResponse<any>> {
    return this.httpClient.get<any>(`${this.apiURL}dashboard`);
  }

  /**
   * CATEGORY
   */
  getCategories(): Observable<APIResponse<Array<Category>>> {
    return this.httpClient.get<any>(`${this.apiURL}category`);
  }

  addCategory(data: Category): Observable<APIResponse<Category>> {
    return this.httpClient.post<any>(`${this.apiURL}category`, data);
  }

  updateCategory(data): Observable<APIResponse<any>> {
    return this.httpClient.put<any>(`${this.apiURL}category`, data);
  }

  deleteCategory(id: string): Observable<APIResponse<any>> {
    return this.httpClient.delete<any>(`${this.apiURL}category/${id}`);
  }

  /**
   * PRODUCT
   */
  getProducts(): Observable<APIResponse<Array<Product>>> {
    return this.httpClient.get<any>(`${this.apiURL}product`);
  }

  getProductDetails(id: string): Observable<APIResponse<Product>> {
    return this.httpClient.get<any>(`${this.apiURL}product?id=${id}`);
  }

  addProduct(data: FormData): Observable<APIResponse<Product>> {
    return this.httpClient.post<any>(`${this.apiURL}product`, data);
  }

  editProduct(data: FormData): Observable<APIResponse<Product>> {
    return this.httpClient.put<any>(`${this.apiURL}product`, data);
  }

  deleteProductImage(data: any): Observable<APIResponse<any>> {
    return this.httpClient.put<any>(`${this.apiURL}product/delete-image`, data);
  }

  deleteProduct(SKU: string): Observable<APIResponse<any>> {
    return this.httpClient.delete<any>(`${this.apiURL}product/${SKU}`);
  }

  public uploadProductImage(productNumber, uploadData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}/product/${productNumber}/image`, uploadData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getRecentProducts(): Observable<APIResponse<Array<Product>>> {
    return this.httpClient.get<any>(`${this.apiURL}product/recent`);
  }

  getCategoryProducts(id: string): Observable<APIResponse<Array<Product>>> {
    return this.httpClient.get<any>(`${this.apiURL}product/category/${id}`);
  }

  searchProducts(s: string): Observable<APIResponse<Array<Product>>> {
    return this.httpClient.get<any>(`${this.apiURL}product?s=${s}`);
  }

  /**
   * ORDER
   */
  getOrders(): Observable<APIResponse<Array<any>>> {
    return this.httpClient.get<any>(`${this.apiURL}order`);
  }

  getUserOrders(email: string): Observable<APIResponse<Array<any>>> {
    return this.httpClient.get<any>(`${this.apiURL}order?email=${email}`);
  }

  createOrder(data: any): Observable<APIResponse<any>> {
    return this.httpClient.post<any>(`${this.apiURL}order`, data);
  }

  addReview(data: any): Observable<APIResponse<any>> {
    return this.httpClient.post<any>(`${this.apiURL}product/review`, data);
  }

  updateReview(data: any): Observable<APIResponse<any>> {
    return this.httpClient.post<any>(`${this.apiURL}product/review`, data);
  }

  /**
   * USER
   */
  getUsers(): Observable<APIResponse<Array<any>>> {
    return this.httpClient.get<any>(`${this.apiURL}user`);
  }
}
