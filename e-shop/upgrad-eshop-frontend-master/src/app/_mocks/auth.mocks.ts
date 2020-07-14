import {AppDataService} from '../_shared/_services/app-data.service';
import {getMockedValidAuthInfoForUser} from './user.mocks';
import {AuthService} from '../auth/services/auth.service';
import {Observable, of, throwError} from 'rxjs';
import {AuthInfo} from '../auth/models/auth.models';


export function getMockedAuthService() {

  let mockedAuthService: Partial<AuthService>;

  mockedAuthService = {

    getMyDetailsWithToken: (message): (Observable<AuthInfo>) => {

      if (message.indexOf('error') >=0  ) {
        return throwError(new Error('Invalid User'));
      } else {
        return of(getMockedValidAuthInfoForUser());
      }
    },

  };

  return mockedAuthService;

}

