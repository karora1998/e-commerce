import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {concatMap, map} from 'rxjs/operators';
import {AuthInfo, getAsUser, LoginRequest, RegisterRequest} from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(loginRequest: LoginRequest): Observable<AuthInfo> {


    return this.getToken(loginRequest)
      .pipe(
        concatMap((token) => this.getMyDetailsWithToken(token)),
      );


  }

  getToken(loginRequest: LoginRequest): Observable<string> {

    const url = environment.baseUrl + '/auth/login';

    console.log('url', url);
    return this.http.post(url, loginRequest)
      .pipe(
        map((response: any) => {
          console.log(response);
          return response.token;
        })
      );
  }

  // register(registerRequest: RegisterRequest, role: ROLE = ROLE.USER, token: string = ''): Observable<AuthInfo> {
  register(registerRequest: RegisterRequest): Observable<AuthInfo> {


    const url = environment.baseUrl + '/auth/register';

    return this.http.post(url, registerRequest)
      .pipe(
        concatMap((response: any) => {


          const loginRequest: LoginRequest = new LoginRequest();
          loginRequest.userName = registerRequest.userName;
          loginRequest.password = registerRequest.password;
          return this.login(loginRequest);
        })

      );
  }


  public getMyDetailsWithToken(token: string): Observable<AuthInfo> {

    const url = environment.baseUrl + '/users/details';

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(url, httpOptions).pipe(
      map((userObject: any) => {

        const authInfo: AuthInfo = new AuthInfo();
        authInfo.token = token;
        authInfo.user = getAsUser(userObject);
        return authInfo;

      })
    );


  }
}
