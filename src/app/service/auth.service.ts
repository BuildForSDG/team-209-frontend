import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, take, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  is_authenticated: boolean = false;
  user;
  report_id;
  bearer_token: string;
  user_id: string;
  httpOptionsAuth;

  cases = [];

  httpOptionsGuest = {
    headers: new HttpHeaders({
      'Content-Type': 'application/vnd.api+json',
      Accept: 'application/vnd.api+json'
      // 'Authorization': `Bearer:${this.bearer_token}`
    })
  };

  constructor(private http: HttpClient) {}

  signup(name: string, email: string, password: string, password_confirmation: string) {
    // this.http.post('')
    // this.user = this.temp_user;
    return this.http
      .post(
        'https://team-209-backend.herokuapp.com/api/users',
        {
          data: {
            type: 'users',
            attributes: {
              name,
              email,
              password,
              password_confirmation
            }
          }
        },
        this.httpOptionsGuest
      )
      .pipe(
        tap((tapdata) => {
          console.log(tapdata);
        })
      );
    // localStorage.setItem('auth_user', JSON.stringify(this.user));
  }

  login(email: string, password: string) {
    return this.http
      .post(
        'https://team-209-backend.herokuapp.com/api/login',
        {
          data: {
            type: 'users',
            attributes: {
              email,
              password,
              device_name: email
            }
          }
        },
        this.httpOptionsGuest
      )
      .pipe(
        tap((tapdata) => {
          console.log('tap', tapdata);
          this.user = tapdata;
          localStorage.setItem('auth_user', JSON.stringify(this.user));
          this.bearer_token = this.user.data.attributes.token;
          this.user_id = this.user.data.included.id;
        })
      );
  }

  autologin() {
    let stored_user = JSON.parse(localStorage.getItem('auth_user'));
    console.log('autologin', stored_user);
    if (stored_user) {
      this.user = stored_user;
      this.bearer_token = this.user.data.attributes.token;
      this.user_id = this.user.data.included.id;
      console.log('bearer_token', this.bearer_token);
    } else {
      return;
    }
  }

  logout() {
    this.user = null;
    localStorage.removeItem('auth_user');
  }

  get_incidents() {
    this.httpOptionsAuth = {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        //'Content-Type': 'application/vnd.api+json',
        //'Content-Type': 'multipart/form-data; charset=utf-8; boundary=' + Math.random().toString().substr(2),
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${this.bearer_token}`
      })
    };
    return this.http.get('https://team-209-backend.herokuapp.com/api/incidents?include=reports', this.httpOptionsAuth);
  }

  get_reports() {
    this.httpOptionsAuth = {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/vnd.api+json',
        //'Content-Type': 'multipart/form-data; charset=utf-8; boundary=' + Math.random().toString().substr(2),
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${this.bearer_token}`
      })
    };

    return this.http.get(
      'https://team-209-backend.herokuapp.com/api/reports/?include=user,incident,attachments',
      this.httpOptionsAuth
    );
  }

  get_attachment() {
    this.httpOptionsAuth = {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        //'Content-Type': 'application/vnd.api+json',
        //'Content-Type': 'multipart/form-data; charset=utf-8; boundary=' + Math.random().toString().substr(2),
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${this.bearer_token}`
      })
    };

    return this.http.get('https://team-209-backend.herokuapp.com/api/attachments?include=report', this.httpOptionsAuth);
  }
}
