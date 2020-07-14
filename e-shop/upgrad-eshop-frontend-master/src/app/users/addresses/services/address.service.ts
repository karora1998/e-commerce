import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Address, AddressRequest} from '../../models/user.models';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {getOptionsForTextResponse} from '../../../_shared/_helpers/http.utils';
import {createAddressFrom} from '../_helpers/address.utils';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) {
  }

  add(addressRequest: AddressRequest): Observable<Address> {

    const url = environment.baseUrl + '/user-addresses';
    return this.http.post(url, addressRequest).pipe(
      map((addressObject: any) => createAddressFrom(addressObject))
    );
  }

  update(id, addressRequest: AddressRequest): Observable<Address> {


    const url = environment.baseUrl + '/user-addresses/' + id;
    return this.http.put(url, addressRequest).pipe(
      map((addressObject: any) => createAddressFrom(addressObject))
    );
  }

  delete(id): Observable<string> {


    const url = environment.baseUrl + '/user-addresses/' + id;
    const options = getOptionsForTextResponse();
    return this.http.delete<string>(url,  options);

  }


  getAddresses(): Observable<Address[]> {


    const createAddressesFromResponse = (addressObjects) => {

      return addressObjects.map(addressObject => {
        return createAddressFrom(addressObject);
      });

    };

    const url = environment.baseUrl + '/user-addresses';
    return this.http.get(url).pipe(
      map((addressObject: any) => createAddressesFromResponse(addressObject))
    );

  }


}
