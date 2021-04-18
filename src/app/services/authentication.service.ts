import {User} from '../model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private url = 'https://hr-datis-backend.herokuapp.com/api/auth/user/';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    const body = {email, password};
    return this.http.post<any>(this.url + 'login', body)
      .pipe(map(res => {
        console.log(res);
        if (res.accessToken) {
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.currentUserSubject.next(res);
        }

        return res;
      }));
  }

  register(username: string, email: string, password: string): Observable<any> {
    const body = {username, email, password};
    const config = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.url + 'registerUser', JSON.stringify(body), {headers: config})
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
