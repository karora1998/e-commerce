import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthInfo} from '../../auth/models/auth.models';
import {AppDataService} from '../_services/app-data.service';
import {getAuthToken} from '../_helpers/auth.utils';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  token: string = null;

  constructor(private  userAuthService: AppDataService) {
    this.userAuthService.authInfo$.subscribe((authInfo: AuthInfo) => {
      this.token = getAuthToken(authInfo);
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.token) {

      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.token
        }
      });

    }
    return next.handle(request);

  }
}
