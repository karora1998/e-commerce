import {CartService} from '../cart/services/cart.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Cart} from '../cart/models/cart.models';
import {getMockedCartWithData} from './cart.mocks';
import {AppDataService} from '../_shared/_services/app-data.service';
import {AuthInfo} from '../auth/models/auth.models';

// export function getMockedCartService() {
//
//   let mockedAppDataService: Partial<AppDataService>;
//
//   mockedAppDataService = {
//     showProgressBar$: BehaviorSubject<boolean>;
//   categories$: BehaviorSubject<string[]>;
//   authInfo$: BehaviorSubject<AuthInfo>;
//   cartItemsCount$: BehaviorSubject<number>;
//
//
//   init(){}
//     showLoading: ():  => {
//     },
//
//   };
//
//   return mockedAppDataService;
//
// }

