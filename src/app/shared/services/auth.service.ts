import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${environment.url}${environment.login}`, user)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('token', token);
          this.setToken(token);
        })
      );
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout(): void {
    this.setToken(null);
    localStorage.clear();
  }
}
