// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:5000/api/auth';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userRole: string = '';

  constructor(private http: HttpClient) {
    this.checkLoggedIn();
  }

  private checkLoggedIn() {
    this.http.get<any>(`${this.authUrl}/current-user`, { withCredentials: true })
      .subscribe(
        res => {
          if (res.user) {
            this.loggedIn.next(true);
            this.userRole = res.user.role;
          }
        },
        err => {
          this.loggedIn.next(false);
        }
      );
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getRole(): string {
    return this.userRole;
  }

  signup(user: any): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/signup`, user, { withCredentials: true })
      .pipe(tap(res => {
        if (res.msg === 'User registered successfully') {
          this.loggedIn.next(true);
          this.userRole = 'USER';
        }
      }));
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, credentials, { withCredentials: true })
      .pipe(tap(res => {
        if (res.msg === 'User logged in successfully' || res.msg === 'Admin logged in successfully') {
          this.loggedIn.next(true);
          this.userRole = res.role; // 'USER' or 'ADMIN'
        }
      }));
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/logout`, {}, { withCredentials: true })
      .pipe(tap(res => {
        if (res.msg === 'Logged out successfully') {
          this.loggedIn.next(false);
          this.userRole = '';
        }
      }));
  }
}
