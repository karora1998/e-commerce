

export function convertToString(obj: any) {
  if (obj) {
    if (typeof obj === 'object') {

      return JSON.stringify(obj);
    }

    return obj;
  } else {
    return '';
  }
}



export function isJson(obj: any) {
  if (obj) {
    return (typeof obj === 'object')
  } else {
    return false;
  }
}


export function  asQueryString(object: any) {

  const params = JSON.parse(JSON.stringify(object));

  return '?' + Object.keys(params).filter(value => (null != params[value] && params[value] !== '')).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&');

}
