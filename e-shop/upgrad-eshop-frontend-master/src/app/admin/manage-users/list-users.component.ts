import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NotificationService} from '../../_shared/_services/notification.service';
import {AppDataService} from '../../_shared/_services/app-data.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {AdminService} from '../services/admin.service';
import {User} from '../../auth/models/auth.models';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  isLoaded = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'userName', 'email', 'roleText', 'Operations'];
  dataSource;

  constructor(public router: Router, private adminService: AdminService, public activatedRoute: ActivatedRoute, private notificationService: NotificationService, private appDataService: AppDataService) {
  }

  ngOnInit(): void {

    this.reload();

  }


  private reload() {
    this.isLoaded = false;
    this.adminService.getAllUsers()
      .subscribe(
        userResponse => this.onUserDataRecieve(userResponse),
        (error => this.onError(error)));
  }

  private onUserDataRecieve(users: User[]) {
    this.isLoaded = true;

    this.dataSource = new MatTableDataSource<User>(users);
    this.dataSource.paginator = this.paginator;
  }


  private onError(error: any) {
    this.notificationService.showErrorMessage(error);
  }


  addAdmin() {
    this.router.navigateByUrl('/admin/manage-users/add', {
      state: {
        title: 'Register New Admin',
        url: this.adminService.getAdminRegisterUrl()
      }
    });
  }

  addInventoryManager() {
    this.router.navigateByUrl('/admin/manage-users/add', {
      state: {
        title: 'Register New Manager',
        url: this.adminService.getInventoryManagerRegisterUrl()
      }
    });
  }


  onDeleteUserComplete(value) {
    this.notificationService.showSuccessMessage('Successfully Removed User');
    this.reload();
  }

  deleteUser(user: User) {

    this.adminService.deleteUser(user.userName)
      .subscribe(value => this.onDeleteUserComplete(value),
        (error => this.onError(error)));

  }

  delete(user: User) {

    this.notificationService.confirm('Do you want to Delete ?')
      .then((res) => {

        this.deleteUser(user);
      });


  }

}
