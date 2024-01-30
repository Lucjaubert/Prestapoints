import { Component, Input, OnInit } from '@angular/core';
import { AlertEnum } from 'src/app/shared/enum/alert.enum';
import { ResponseApi } from 'src/app/shared/model/responseApi';
import { User } from 'src/app/shared/model/user';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UserService } from 'src/app/shared/services/user.service';
import { RoleEnum } from 'src/app/shared/enum/role.enum';
import { ToolsService } from 'src/app/shared/services/tools.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public users?: User[];
  public responseApi?: ResponseApi;
  public selectedUsers: User[] = [];
  public user?: User;
  public isNewUser: boolean = true;
  public isAscOrder: boolean = false;
  public orderUsersByProperty: keyof User = 'creationDate';

  constructor(
    private userService: UserService,
    private alertService: AlertService, 
    private toolsService: ToolsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe((response) => {
      this.responseApi = response;

      if (this.responseApi?.responseValid == true) {
        this.alertService.setAlert(
          AlertEnum.TYPE_SUCCESS,
          AlertEnum.MESSAGE_DELETE_SUCCESS,
          AlertEnum.TIME_MEDIUM
        );
        this.getUsers();
      } else {
        this.alertService.setAlert(
          AlertEnum.TYPE_DANGER,
          this.responseApi?.message ?? AlertEnum.ERROR,
          AlertEnum.TIME_INFINITY
        );
      }
    });
  }

  deleteUsers() {
    if (this.selectedUsers.length > 0) {
      this.userService.deleteUsers(this.selectedUsers).subscribe((response) => {
        this.responseApi = response;

        if (this.responseApi?.responseValid == true) {
          this.alertService.setAlert(
            AlertEnum.TYPE_SUCCESS,
            AlertEnum.MESSAGE_DELETE_SUCCESS,
            AlertEnum.TIME_MEDIUM
          );
          this.getUsers();
        } else {
          this.alertService.setAlert(
            AlertEnum.TYPE_DANGER,
            this.responseApi?.message ?? AlertEnum.ERROR,
            AlertEnum.TIME_INFINITY
          );
        }
      });
    }
  }

  addToDeleteList(cbTarget: EventTarget | null, user: User) {
    const target = cbTarget as HTMLInputElement;
    if (target.checked) {
      this.selectedUsers.push(user);
    } else {
      const index = this.selectedUsers.indexOf(user);
      if (index > -1) {
        this.selectedUsers.splice(index, 1);
      }
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe((response) => {
      this.users = response;
      this.users.forEach((user) => {
        user.roles?.forEach((role) => {
          switch (role.name) {
            case RoleEnum.USER:
              role.slug = RoleEnum.SLUG_USER;
              break;
            case RoleEnum.ADMIN:
              role.slug = RoleEnum.SLUG_ADMIN;
              break;
            }
          });
        });
        this.needToOrder();
    });
  }

  showAddUserForm(isNewUser: boolean = true) {
    this.user = new User();
    this.isNewUser = isNewUser;
  }

  showEditUserForm(user: User, isNewUser: boolean = false) {
    this.user = user;
    this.isNewUser = isNewUser;
  }

  needToRefresh($event: boolean) {
    if ($event) {
      this.getUsers();
    }
  }

  needToOrder() {
      this.isAscOrder ? this.ascOrderUsersByProperty(this.orderUsersByProperty) : this.descOrderUsersByProperty(this.orderUsersByProperty);
  }

  ascOrderUsersByProperty(property: keyof User) {
    if (this.users != null) {
      this.users = this.toolsService.ascSortListOfObjectByProperty(this.users, property)
      this.orderUsersByProperty = property;
      this.isAscOrder = true;
    }
  }

  descOrderUsersByProperty(property: keyof User) {
    if (this.users != null) {
      this.users = this.toolsService.descSortListOfObjectByProperty(this.users, property)
      this.orderUsersByProperty = property;
      this.isAscOrder = false;
    }
  }

  detailUser(user: User) {
    // this.router.navigate(['/'], { postParams: { user: JSON.stringify(user) }});
  }
}
