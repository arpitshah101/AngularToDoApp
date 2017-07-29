import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  login(username: string, password: string) {
    return this.http.post('/auth/login', {
        username,
        password,
      });
  }

}
