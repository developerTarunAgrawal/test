import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as myGlobals from '../globals';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = myGlobals.baseUrl;
  constructor(private http: HttpClient) { }

  postMethod(type, formData): Observable<any> {

    // var headers_object = new Headers();
    // headers_object.append('token', 'e090c25187ee2b3f9f1f8a02747356641');
    return this.http.post<any>(this.apiUrl + type, formData);
  }
  // postMethodWithBody(type, formData): Observable<any> {
  //   var headers_object = new HttpHeaders().set("Authkey", "test-angular-2021");
  //   return this.http.post<any>(type, formData, { headers: headers_object });
  // }
  postMethodWithHead(type, formData): Observable<any> {
    var headers_object = new HttpHeaders().set("Authkey", "test-angular-2021");
    return this.http.post<any>(this.apiUrl + type, formData, { headers: headers_object });
  }
  postMethodWithHeadWithUrl(type, formData): Observable<any> {
    var headers_object = new HttpHeaders().set("Authkey", "test-angular-2021");
    return this.http.post<any>(type, formData, { headers: headers_object });
  }
  getMethod(type): Observable<any> {
    return this.http.get<any>(this.apiUrl + type);
  }
  putMethod(type, body): Observable<any> {
    return this.http.put<any>(this.apiUrl + type, body);
  }
}
