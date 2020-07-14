export class UpdateUserDetailRequest {
  public email;
  public firstName;
  public lastName;
  public phoneNumber;

  constructor(obj: Partial<UpdateUserDetailRequest> = {}) {
    Object.assign(this, obj);
  }


}

export class ChangePasswordRequest {
  public oldPassword;
  public password;


  constructor(obj: Partial<ChangePasswordRequest> = {}) {
    Object.assign(this, obj);
  }


}

export class Address {
  public id;
  public name;
  public city;
  public landmark?;
  public phone;
  public state;
  public street;
  public zipcode;


  constructor(obj: Partial<Address> = {}) {
    Object.assign(this, obj);
  }


}



export class AddressRequest {
  public name;
  public city;
  public landmark?;
  public phone;
  public state;
  public street;
  public zipcode;


  constructor(obj: Partial<Address> = {}) {
    Object.assign(this, obj);
  }


}

