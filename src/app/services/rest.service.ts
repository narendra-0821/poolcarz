import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) {}

  getRides(): Observable<any> {
    return this.http.get('/rides.json');
  }

  getUsers(): Observable<any> {
    return this.http.get('/users.json');
  }
}
