import {HttpHeaders} from '@angular/common/http';

export function getOptionsForTextResponse() {
  const headers = new HttpHeaders().set('Accept', 'text/plain; charset=utf-8');

  const httpOptions = {
    headers, responseType: 'text'
  };


  const options = {headers, responseType: 'text' as 'json'};
  return options;
}
