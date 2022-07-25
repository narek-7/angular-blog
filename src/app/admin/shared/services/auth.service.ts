import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FirebaseAuthResponse, User } from '../../../shared/interfaces';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): any {
    const expDate = new Date(String(localStorage.getItem('fb-token-exp')));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(tap(this.setToken));
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: FirebaseAuthResponse | null) {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + Number(response.expiresIn) * 1000
      );
      localStorage.setItem('fb-token', String(response.idToken));
      localStorage.setItem('fb-token-exp', String(expDate));
    } else {
      localStorage.clear();
    }
  }
}
