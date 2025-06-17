import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

  import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) {}

  getRides(): Observable<any> {
    return this.http.get('/rides.json');
  }



getUsers(): Observable<any[]> {
  return of([
    { username: 'admin', password: 'admin123' },
    { username: 'john', password: 'john123' }
  ]);
}

  // getUsers(): Observable<any> {
  //   return this.http.get<any[]>('assets/users.json');
  // }
}
