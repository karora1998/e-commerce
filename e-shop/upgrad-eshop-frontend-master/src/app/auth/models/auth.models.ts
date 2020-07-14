import {createAddressesFrom} from '../../users/addresses/_helpers/address.utils';
import {Address} from '../../users/models/user.models';

export class LoginRequest {
  public userName;
  public password;

  constructor(obj: Partial<LoginRequest> = {}) {
    Object.assign(this, obj);
  }


}



export class RegisterRequest {

  public email;
  public firstName;
  public lastName;
  public password;
  public phoneNumber;
  public userName;


  constructor(obj: Partial<RegisterRequest> = {}) {
    Object.assign(this, obj);
  }


}

export enum ROLE {
  USER, INVENTORY_MANAGER, ADMIN

}



export function getRoleByName(roleName) {

  const allRoles = {
    'USER': ROLE.USER,
    'INVENTORY_MANAGER': ROLE.INVENTORY_MANAGER,
    'ADMIN': ROLE.ADMIN
  };
  return allRoles[roleName.toUpperCase()];

}

export class User {

  public id;
  public userName;
  public firstName;
  public email;
  public lastName;
  public phoneNumber;
  public created: Date;
  public updated: Date;
  public role: ROLE;
  public roleText?: string;
  public addresses: Address[];


  constructor(obj: Partial<User> = {}) {
    Object.assign(this, obj);
  }


}


export function getAsUser(userObject) {
  return new User({
    id: userObject.id,
    userName: userObject.userName,
    firstName: userObject.firstName,
    email: userObject.email,
    lastName: userObject.lastName,
    phoneNumber: userObject.phoneNumber,
    created: new Date(userObject.created),
    updated: new Date(userObject.updated),
    role: getRoleByName(userObject.roles[0].name),
    roleText: userObject.roles[0].name,
    addresses: createAddressesFrom(userObject.addresses)

  });
}

export class AuthInfo {

  public user: User;
  public token: string;

  constructor(obj: Partial<AuthInfo> = {}) {
    Object.assign(this, obj);
  }


}
