import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from './authentication.service';

/**
 * The EmployeeService handles fetching all employees and add or update an employee. Responsible for making API
 * requests and storing the employee as a behavior subject.
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeSubject: BehaviorSubject<any>;
  public employeeObservable: Observable<any>;
  private url = 'https://hr-datis-backend.herokuapp.com/api/employee/';
  private config = new HttpHeaders({
    'x-access-token': this.authService.currentUserValue.accessToken,
  });

  /**
   * Initializes the employee behavior subject.
   * @param httpClient - HttpClient for making requests.
   * @param authService - Authentication service for fetching current user information.
   */
  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.employeeSubject = new BehaviorSubject<any>(null);
    this.employeeObservable = this.employeeSubject.asObservable();
  }

  /**
   * Updates the behavior subject with the employee information. Activated upon
   * clicking the Update Button.
   * @param employee - Employee object.
   */
  updateEmployeeSubject(employee): void {
    this.employeeSubject.next(employee);
  }

  /**
   * Function that makes a HTTP GET request to fetch all employees.
   * @return response as an Observable.
   */
  getAllEmployees(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'all', {headers: this.config})
      .pipe(map(res => {
        return res;
      }));
  }

  /**
   * Function that makes a HTTP POST request to add an employee.
   * @return response as an Observable.
   */
  addEmployee(employee): Observable<any> {
    return this.httpClient.post<any>(this.url + 'add', employee, {headers: this.config})
      .pipe(map(res => {
        return res;
      }));
  }

  /**
   * Function that makes a HTTP POST request to update an employee.
   * @return response as an Observable.
   */
  updateEmployee(employee, id): Observable<any> {
    return this.httpClient.put(this.url + 'update/' + id, employee, {headers: this.config})
      .pipe(map(res => {
        return res;
      }));
  }
}
