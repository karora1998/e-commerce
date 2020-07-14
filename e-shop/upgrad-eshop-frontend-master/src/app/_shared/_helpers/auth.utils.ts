import {AuthInfo, ROLE} from '../../auth/models/auth.models';

export function isLoggedIn(authInfo: AuthInfo) {

  if (authInfo && authInfo.token) {
    return true;
  } else {
    return false;
  }
}

export function isNotLoggedIn(authInfo: AuthInfo) {


  return !isLoggedIn(authInfo);

}

function isRoleGreaterThanOrEqualTo(authInfo: AuthInfo, currentRole: ROLE) {
  const role: ROLE = getRole(authInfo);
  let isManager = false;
  if (role) {
    isManager = (role >= currentRole);
  }
  return isManager;
}

export function isInventoryManager(authInfo: AuthInfo) {

  return isRoleGreaterThanOrEqualTo(authInfo, ROLE.INVENTORY_MANAGER);


}

export function isAdmin(authInfo: AuthInfo) {

  return isRoleGreaterThanOrEqualTo(authInfo, ROLE.ADMIN);


}



export function getUser(authInfo: AuthInfo) {

  if (authInfo && authInfo.user) {
    return authInfo.user;
  } else {
    return null;
  }
}

export function getAuthToken(authInfo: AuthInfo) {

  if (authInfo && authInfo.token) {
    return authInfo.token;
  } else {
    return null;
  }
}

export function getRole(authInfo: AuthInfo): ROLE {

  if (authInfo && authInfo.user) {
    return authInfo.user.role;
  } else {
    return null;
  }
}
