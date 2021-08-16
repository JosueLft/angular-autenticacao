import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login.models';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}
  
  logar(login: Login): Observable<any> {
    return this.http.post(
      env.apiUrlBase + "auth/",
      login
    );
  }
}
