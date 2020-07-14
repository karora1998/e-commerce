import {convertToString, isJson} from './string.utils';
import {clearLoginToken, retrieveLoginToken, saveLoginToken} from './storage.utils';

describe('String Utils', () => {
  it('string should return as String, Json To Be Converted as String , Null should be returned as empty', () => {

    expect(convertToString('string')).toBe('string');
    const object = {id: 1};
    expect(convertToString(object)).toBe(JSON.stringify(object));
    expect(convertToString(undefined)).toBe('');
    expect(convertToString(null)).toBe('');
  });

  it('save & retrieve Login Token', () => {

    const token = 'somexxx';
    saveLoginToken(token);


    expect(retrieveLoginToken()).toBe(token);
    clearLoginToken();

    expect(retrieveLoginToken()).toBeNull();
  });
  it('validate json or not', () => {


    expect(isJson({})).toBeTrue();
    expect(isJson('some string')).toBeFalse();
    expect(isJson(12)).toBeFalse();
  });
});
