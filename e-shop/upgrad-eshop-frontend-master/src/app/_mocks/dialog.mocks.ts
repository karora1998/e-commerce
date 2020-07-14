import {Observable, of} from 'rxjs';
import {CartService} from '../cart/services/cart.service';
import {Cart} from '../cart/models/cart.models';
import {getMockedCartWithData} from './cart.mocks';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarConfig} from '@angular/material/snack-bar/snack-bar-config';
import {MatSnackBarRef} from '@angular/material/snack-bar/snack-bar-ref';
import {SimpleSnackBar} from '@angular/material/snack-bar/simple-snack-bar';

export function getMatDialogRef() {

  return {
    close: () => {
    },
    afterClosed: () => {
      return of('true');
    }

  };
}

export function getZone() {

  return {
    run(fn: (...args: any[]) => void){
      console.log("calling")
      fn();
    }

  };
}


export function getSnackBar() {


  let mockedSnackBar;

  mockedSnackBar = {

    open: (message: string, action?: string, config?: MatSnackBarConfig) => {
      return getOpenedSnackBar();
    }

  };

  return mockedSnackBar;

}

export function getInjector() {

  return {
    get: () => {
      return '';
    }
  };
}

export function getOpenedSnackBar() {

  return {
    dismiss: () => {
      return;
    },
    onAction: () => {
      return of('action done');
    }

  };
}


export function getMatDialog() {

  return {
    open: () => {
      return getMatDialogRef();
    },

  };
}
