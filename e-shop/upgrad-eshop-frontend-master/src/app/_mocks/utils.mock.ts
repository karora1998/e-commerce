import {of} from 'rxjs';
import {convertToParamMap, RouterStateSnapshot} from '@angular/router';
import createSpyObj = jasmine.createSpyObj;
import {FormGroup} from '@angular/forms';
import {MatSnackBarConfig} from '@angular/material/snack-bar/snack-bar-config';
import {Injector} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';


export function getRouterStateSnapshotStubFor() {

    return createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);


}

export function getActivatedRouteStubFor(params) {

    return {
        paramMap: of(convertToParamMap(params))
    };
}
export function getActivatedQueryParamsStubFor(params) {

    return {
      snapshot:{
        queryParams:params
      }
    };
}



export function cloneObjectFrom(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function getNotificationService() {

    let service = {
        showErrorMessage: (message) => {
            console.log('showErrorMessage  ' + message);
        },
        showSuccessMessage: (message) => {
            console.log('showSuccessMessage' + message);
        },
        confirm: (message) => {
            return new Promise((resolve, reject) => {
                resolve(true);
            });
        },
    };

    return service;
}

export function getClipboard() {

    return {
        copy: (message) => {


            //  return new Promise((resolve, reject) => {
            if (message.indexOf('error') >=0 ) {
                return false;
            } else {
                return true;
            }
            //  });


        }

    };
}


export function getInSelector(nativeElement: HTMLElement, query: string) {
    return nativeElement.querySelector(query).textContent;
}

export function getAsNumberInSelector(nativeElement: HTMLElement, query: string): number {
    const inSelector = getInSelector(nativeElement, query);

    if (inSelector) {
        return parseInt(inSelector, 0);
    } else {
        return 0;
    }
}

export function getAllErrors(form: FormGroup): { [key: string]: any; } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
        const control = form.get(key);
        const errors = (control instanceof FormGroup)
            ? this.getAllErrors(control)
            : control.errors;
        if (errors) {
            acc[key] = errors;
            hasError = true;
        }
        return acc;
    }, {} as { [key: string]: any; });
    return hasError ? result : null;
}
