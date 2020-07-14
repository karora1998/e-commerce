import {Injectable} from '@angular/core';
import {AuthInfo, getAsUser, LoginRequest, RegisterRequest, User} from '../../auth/models/auth.models';
import {environment} from '../../../environments/environment';
import {concatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {getOptionsForTextResponse} from '../../_shared/_helpers/http.utils';
import {getAsCoupon} from '../coupons/models/coupon.models';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http: HttpClient) {
  }


  getAllUsers(): Observable<User[]> {

    const url = environment.baseUrl + '/users';

    return this.http.get(url)
      .pipe(
        map((userObject: any) => this.getUsers(userObject)));

  }

  private getUsers(rawUsers: any) {

    return rawUsers.map(rawUser => {
      return getAsUser(rawUser);
    });

  }

  getAdminRegisterUrl() {

    return environment.baseUrl + '/auth/admin/register';

  }

  getInventoryManagerRegisterUrl() {

    return environment.baseUrl + '/auth/manager/register';

  }


  registerUserOn(url: string, registerRequest: RegisterRequest) {
    return this.http.post(url, registerRequest)
      .pipe(
        map((userObject: any) => getAsUser(userObject)));
  }

  deleteUser(userName) {

    const url = environment.baseUrl + '/users/deleteuser/' + userName;
    const options = getOptionsForTextResponse();
    return this.http.delete<string>(url, options);

  }
}
