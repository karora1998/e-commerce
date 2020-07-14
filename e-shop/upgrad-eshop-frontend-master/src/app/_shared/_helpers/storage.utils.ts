function setInStorage(key: string, value: string) {

  localStorage.setItem(key, value);
}

function getFromStorage(key: string) {

  return localStorage.getItem(key);
}

function clearFromStorage(key: string) {

  return localStorage.removeItem(key);
}

const LOGIN_TOKEN = 'LOGIN_TOKEN';

export function saveLoginToken(value: string) {

  setInStorage(LOGIN_TOKEN, value);
}

export function retrieveLoginToken() {

  return getFromStorage(LOGIN_TOKEN);
}

export function clearLoginToken() {

  return clearFromStorage(LOGIN_TOKEN);
}
