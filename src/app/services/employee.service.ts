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

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  getAllEmployees(): Observable<any> {
    const config = new HttpHeaders({
      'x-access-token': this.authService.currentUserValue.accessToken,
    });
    return this.httpClient.get<any>(this.url + 'all', {headers: config})
      .pipe(map(res => {
        return res;
      }));
  }
}
