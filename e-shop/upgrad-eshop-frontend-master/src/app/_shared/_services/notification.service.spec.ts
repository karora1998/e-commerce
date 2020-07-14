import {fakeAsync, flushMicrotasks} from '@angular/core/testing';
import {NotificationService} from './notification.service';
import {getInjector, getMatDialog, getSnackBar, getZone} from '../../_mocks/dialog.mocks';
import anything = jasmine.anything;


describe('NotificationService - without test bed', () => {
  let service: NotificationService;
  let injector;
  let snackBar;
  let zone;
  let matDialog;
  beforeEach(() => {

    injector = getInjector();
    snackBar = getSnackBar();
    zone = getZone();
    matDialog = getMatDialog();
    spyOn(zone, 'run').and.callThrough();
    spyOn(snackBar, 'open').and.callThrough();
    spyOn(matDialog, 'open').and.callThrough();
    // @ts-ignore
    service = new NotificationService(injector, snackBar, zone, matDialog);


  });


  it('expect to be truthy and show success message runs in ngzone', () => {

    expect(service).toBeTruthy();
    service.showSuccessMessage('halo');
    expect(zone.run).toHaveBeenCalled();
  });


  it('showerror message with string shows string', () => {


    const msg = 'Error message';
    service.showErrorMessage(msg);
    expect(snackBar.open).toHaveBeenCalledWith(msg, anything(), anything());
  });

  it('showerror message with object stringify', () => {


    const msg = {'msg': 'Unable to find'};
    service.showErrorMessage(msg);
    expect(snackBar.open).toHaveBeenCalledWith(JSON.stringify(msg), anything(), anything());
  });
  it('showerror message with http error shows only message', () => {

    const errorMessage = 'Unable to find';
    const msg = {
      'error': {
        'message': errorMessage
      }
    };
    service.showErrorMessage(msg);

    expect(snackBar.open).toHaveBeenCalledWith('Error: ' + errorMessage, anything(), anything());
  });

  it('confirm message should open confirm dialogue', fakeAsync(() => {

    let result;
    service.confirm('Do you want to proceed').then(value => {
      result = value;
    });


    expect(matDialog.open).toHaveBeenCalled();
    flushMicrotasks();
    expect(result).toBeTruthy();
  }));

});
