import {AuthInfo, RegisterRequest} from '../auth/models/auth.models';
import {Address} from '../users/models/user.models';
import {cloneObjectFrom} from './utils.mock';

const allusers=[{"id":1,"userName":"user","created":"2020-04-24T22:57:36.385","updated":"2020-04-24T22:57:36.385","firstName":"user","email":"user@upgrad.com","lastName":"","phoneNumber":"9629150400","roles":[{"id":1,"name":"USER","description":null}],"addresses":[]},{"id":2,"userName":"JonSnow","created":"2020-04-24T22:57:36.53","updated":"2020-04-24T22:57:36.53","firstName":"JonSnow","email":"JonSnow@upgrad.com","lastName":"","phoneNumber":"9629150400","roles":[{"id":1,"name":"USER","description":null}],"addresses":[]},{"id":3,"userName":"Ned","created":"2020-04-24T22:57:36.621","updated":"2020-04-24T22:57:36.621","firstName":"Ned","email":"Ned@upgrad.com","lastName":"","phoneNumber":"9629150400","roles":[{"id":1,"name":"USER","description":null}],"addresses":[]},{"id":4,"userName":"Robert","created":"2020-04-24T22:57:36.711","updated":"2020-04-24T22:57:36.711","firstName":"Robert","email":"Robert@upgrad.com","lastName":"","phoneNumber":"9629150400","roles":[{"id":1,"name":"USER","description":null}],"addresses":[]},{"id":5,"userName":"manager","created":"2020-04-24T22:57:36.802","updated":"2020-04-24T22:57:36.802","firstName":"manager","email":"manager@upgrad.com","lastName":"","phoneNumber":"9629150400","roles":[{"id":3,"name":"INVENTORY_MANAGER","description":null}],"addresses":[]},{"id":6,"userName":"admin","created":"2020-04-24T22:57:36.891","updated":"2020-04-24T22:57:36.891","firstName":"admin","email":"admin@upgrad.com","lastName":"","phoneNumber":"9629150400","roles":[{"id":2,"name":"ADMIN","description":null}],"addresses":[]}];

const userDetailResponse = {
  'id': 4,
  'userName': 'newusera',
  'created': '2020-04-09T18:48:55.944',
  'updated': '2020-04-09T18:48:55.944',
  'firstName': 'MK',
  'email': 'newusera@upgrad.com',
  'lastName': 'Gandhi',
  'phoneNumber': '+91988989232',
  'roles': [
    {
      'id': 1,
      'name': 'USER',
      'description': null
    }
  ],
  'addresses': null
};


const validUser = {
  'id': 1,
  'userName': 'user',
  'firstName': '',
  'lastName': '',
  'email': 'user@upgrad.com',
  'phoneNumber': '+919629150400',
  'created': new Date('2020-04-08T07:34:46.573Z'),
  'updated': new Date('2020-04-08T07:34:46.573Z'),
  'role': 0,
  'addresses': []
};


const validAuthInfo = {
  'user': validUser,
  'token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwic2NvcGVzIjoiUk9MRV9VU0VSIiwiaWF0IjoxNTg2NjkxMzAxLCJleHAiOjE1ODY3MzQ1MDF9.3bFZhVT77AZvl0EYG8Fyx2dEFL4pYgYDZeUXc_w2vi0'

};

export function getMockedValidAuthInfo(): AuthInfo {

  return validAuthInfo;

}


export function getMockedValidAuthInfoForUser(): AuthInfo {

  return validAuthInfo;

}


export function getMockedAllUserResponse() {

  return allusers;
}


export function getMockedValidAuthInfoForManager(): AuthInfo {

  const authInfo = cloneObjectFrom(validAuthInfo);

  authInfo.user.role = 1;
  authInfo.user.userName = "manager";
  authInfo.user.email = "manager@upgrad.com";
  return authInfo;

}


export function getMockedValidAuthInfoForAdmin(): AuthInfo {

  const authInfo = cloneObjectFrom(validAuthInfo);
  authInfo.user.role = 2;
  authInfo.user.userName = "admin";
  authInfo.user.email = "admin@upgrad.com";
  return authInfo;

}

export function getMockedAddress() {

  return new Address({
    name: 'Daenerys Targaryen',
    street: 'Dragon pit',
    city: 'House Targaryen',
    landmark: '',
    phone: '789454545',
    state: 'Seven Kingdom',
    zipcode: '624517',

  });

}

export function getMockedLoginResponse(username) {

  const loginResponse = {
    'userName': 'user',
    'message': 'Success',
    'token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwic2NvcGVzIjoiUk9MRV9VU0VSIiwiaWF0IjoxNTg2NDU3OTA0LCJleHAiOjE1ODY1MDExMDR9.wpbc-6JzMtDEfMEJS7UXpB6u7kC8zUZKDT_xZUvYJJA'
  };

  loginResponse.userName = username;
  return loginResponse;
}

export function getMockedUserDetailResponseForManager(username) {
  const userDetails = getMockedUserDetailResponse(username)
  userDetails.roles[0].name='INVENTORY_MANAGER'
  return userDetails;
}
export function getMockedUserDetailResponseForAdmin(username) {
  const userDetails = getMockedUserDetailResponse(username)
  userDetails.roles[0].name='ADMIN'
  return userDetails;
}
export function getMockedUserDetailResponse(username) {

  const userDetailResponse = {
    'id': 4,
    'userName': 'newusera',
    'created': '2020-04-09T18:48:55.944',
    'updated': '2020-04-09T18:48:55.944',
    'firstName': 'MK',
    'email': 'newusera@upgrad.com',
    'lastName': 'Gandhi',
    'phoneNumber': '+91988989232',
    'roles': [
      {
        'id': 1,
        'name': 'USER',
        'description': null
      }
    ],
    'addresses': null
  };

  userDetailResponse.userName = username;
  return userDetailResponse;

}


export function getRegisterRequestWith(name: string, password: string) {
  const registerRequest: RegisterRequest = new RegisterRequest({
    email: name + '@upgrad.com',
    firstName: name,
    lastName: 'some last',
    phoneNumber: '98956325',
    password: password,
    userName: name
  });
  return registerRequest;
}
