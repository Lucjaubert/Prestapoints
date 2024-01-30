import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';
import { AlertEnum } from 'src/app/shared/enum/alert.enum';
import { RoleEnum } from 'src/app/shared/enum/role.enum';
import { ResponseApi } from 'src/app/shared/model/responseApi';
import { Role } from 'src/app/shared/model/role';
import { User } from 'src/app/shared/model/user';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss'],
})
export class UserformComponent {
  @Output()
  public needToRefresh: EventEmitter<boolean> = new EventEmitter();
  
  @Input()
  public isNewUser: boolean = true;

  @Input()
  public set user(user: User | undefined) {
    const isOtherUser = this.userValue?.id != user?.id;
    this.userValue = user;
    if (this.userValue != undefined) {
      this.userForm.patchValue({
        firstname: this.user?.firstname,
        lastname: this.user?.lastname,
        email: this.user?.email,
        phone: this.user?.phone,
        roles: this.user?.roles?.map((r) => r.name),
      });
    }
  }

  public get user(): User | undefined {
    return this.userValue;
  }

  public userForm: FormGroup;
  public roles?: Role[];

  private userValue?: User;
  private roleUser: Role = new Role(RoleEnum.USER);
  private roleAdmin: Role = new Role(RoleEnum.ADMIN);
  private newUser?: User;
  private responseApi?: ResponseApi;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      roles: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.phoneValidator]],
    });

    this.roles = [this.roleUser, this.roleAdmin];
  }

  async onSubmit() {
    const email = this.userForm.get('email')?.value;
    //new user
    if (this.userForm.valid && this.isNewUser) {
      //can't be a new user with existing email
      if (email && (await this.userService.verifyEmail(email))) {
        this.alertService.setAlert(
          AlertEnum.TYPE_DANGER,
          AlertEnum.MESSAGE_EMAIL_ALREADY_EXIST,
          AlertEnum.TIME_LONG
        );
      } else {
        this.newUser = new User(
          this.userForm.get('firstname')?.value,
          this.userForm.get('lastname')?.value,
          this.userForm.get('email')?.value,
          't123456789',
          this.userForm.get('phone')?.value,
          this.getRoles()
        );

        this.saveUser(this.newUser);
      }
    } else {
      if (email && (await !this.userService.verifyEmail(email))) {

        this.alertService.setAlert(
          AlertEnum.TYPE_DANGER,
          AlertEnum.MESSAGE_EMAIL_NOT_FOUND,
          AlertEnum.TIME_LONG
        );
      } else {
        if (this.userForm.valid && email && this.user) {
          this.user.firstname = this.userForm.get('firstname')?.value;
          this.user.lastname = this.userForm.get('lastname')?.value;
          this.user.phone = this.userForm.get('phone')?.value;
          this.user.roles = this.getRoles();
          this.saveUser(this.user);
        }
      }
    }
  }

  saveUser(user: User) {
    this.userService.saveUser(user).subscribe((response) => {
      this.responseApi = response;

      if (this.responseApi.responseValid == true) {
        this.alertService.setAlert(
          AlertEnum.TYPE_SUCCESS,
          this.isNewUser
            ? AlertEnum.MESSAGE_SIGNIN_SUCCESS
            : AlertEnum.MESSAGE_UPDATE_SUCCESS,
          AlertEnum.TIME_MEDIUM
        );

      } else {
        this.alertService.setAlert(
          AlertEnum.TYPE_DANGER,
          this.responseApi.message,
          AlertEnum.TIME_MEDIUM
        );
      }
      this.userForm.reset();
      this.needToRefresh.emit(true);
    });
  }

  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const phoneRegex = RegExp('(^0\\d{9})');
    const valid = phoneRegex.test(control.value);

    const errors = {
      phone: {
        rules: 'Le numéro est non conforme',
      },
    };
    return !valid ? errors : null;
  }

  getRoles(): Role[] {
    const roles: Role[] = [];
    if (this.userForm.get('roles')?.value) {
      this.userForm.get('roles')?.value.forEach((role: string | undefined) => {
        roles.push(new Role(role));
      });
    }
    return roles;
  }


}
