import {Injectable, Injector, NgZone} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {convertToString, isJson} from '../_helpers/string.utils';
import {ConfirmDialogComponent} from '../_components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(
    private injector: Injector,
    public snackBar: MatSnackBar,
    private readonly zone: NgZone,
    public dialog: MatDialog
  ) {
  }


  confirm(msg): Promise<boolean> {


    return new Promise((resolve, reject) => {

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '300px',
        data: {msg}
      });

      dialogRef.afterClosed().subscribe(result => {

        if (result) {
          resolve(true);
        }

      });

    });

  }

  showErrorMessage(msg: any) {

    let result = msg;
    if (this.hasErrorMessage(msg)) {


      result = 'Error: ' + msg['error']['message'];
    }

    this.showMessageWithClass(result, 'error');
  }

  private hasErrorMessage(msg: any) {
    return isJson(msg) && msg.hasOwnProperty('error') && msg['error'].hasOwnProperty('message');
  }

  showSuccessMessage(msg: any) {

    this.showMessageWithClass(msg, 'success');
  }

  showMessageWithClass(msg: any, classname: string) {
    console.log("showMessageWithClass snack")

    this.zone.run(() => {


      console.log("running snack")
      const snackBar = this.snackBar.open(convertToString(msg), ' OK', {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: classname,
        duration: 3000,
      });
      snackBar.onAction().subscribe(() => {
        snackBar.dismiss();
      });


    });
  }

}
