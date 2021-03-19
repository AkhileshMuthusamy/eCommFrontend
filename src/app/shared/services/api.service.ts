import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {APIResponse} from '../Objects/api-response';
import {Category} from "../Objects/global-obj";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiURL: string;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getCategories(): Observable<APIResponse<any>> {
    return this.httpClient.get<any>(`${this.apiURL}category`);
  }

  addCategory(data: Category): Observable<APIResponse<any>> {
    return this.httpClient.post<any>(`${this.apiURL}category`, data);
  }

  updateCategory(data): Observable<APIResponse<any>> {
    return this.httpClient.put<any>(`${this.apiURL}category`, data);
  }

  deleteCategory(id: string): Observable<APIResponse<any>> {
    return this.httpClient.delete<any>(`${this.apiURL}category/${id}`);
  }

  public uploadProductImage(productNumber, uploadData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}maintenance/product/${productNumber}/image`, uploadData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
