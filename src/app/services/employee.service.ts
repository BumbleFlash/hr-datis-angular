import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'https://hr-datis-backend.herokuapp.com/api/employee/';
  private config = new HttpHeaders({
    'x-access-token': this.authService.currentUserValue.accessToken,
  });

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  getAllEmployees(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'all', {headers: this.config})
      .pipe(map(res => {
        return res;
      }));
  }

  addEmployee(employee): Observable<any> {
    return this.httpClient.post<any>(this.url + 'add', employee, {headers: this.config})
      .pipe(map(res => {
        return res;
      }));
  }
}
