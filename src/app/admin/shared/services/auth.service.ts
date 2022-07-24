import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../shared/interfaces';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  get token(): string {
    return '';
  }

  private setToken(token: string) {

  }

  login(user: User): Observable<any> {
    return this.http.post('', user);
  }

  logout() {}

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
