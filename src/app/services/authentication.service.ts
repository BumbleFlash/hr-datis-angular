import {User} from '../model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

/**
 * The AuthService handles login, logout and registration of a user. Responsible for making all API requests
 * and current user information as a BehaviorSubject.
 */
@Injectable({providedIn: 'root'})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private url = 'https://hr-datis-backend.herokuapp.com/api/auth/user/';

  /**
   * the user information is populated if they are already logged in.
   * @param http - HttpClient for making Http requests.
   */
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Function to return the value of the current user.
   * @return currentUserValue
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Function that makes a post request to the login API and returns response as an observable.
   * @param email - Email of the user.
   * @param password - password provided
   * @return response - Observable response from the server.
   */
  login(email: string, password: string): Observable<any> {
    const body = {email, password};
    return this.http.post<any>(this.url + 'login', body)
      .pipe(map(res => {
        if (res.accessToken) {
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.currentUserSubject.next(res);
        }
        return res;
      }));
  }

  /**
   * Function that makes a post request to the register API and returns response as an observable.
   * @param username - First and Last name of the user.
   * @param email - Email provided by the user.
   * @param password - Password provided by the user.
   * @return response - Response as an observable .
   */
  register(username: string, email: string, password: string): Observable<any> {
    const body = {username, email, password};
    const config = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.url + 'registerUser', JSON.stringify(body), {headers: config})
      .pipe(map(res => {
        return res;
      }));
  }

  /**
   * Function to log out the user. The behavior subject is set to null and the current user is removed
   * from local storage.
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
