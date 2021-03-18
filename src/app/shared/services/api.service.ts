import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiURL: string;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  public uploadProductImage(productNumber, uploadData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}maintenance/product/${productNumber}/image`, uploadData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
