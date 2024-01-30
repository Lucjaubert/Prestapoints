import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
// import { SignInService } from './service/signIn.service';
import { User } from 'src/app/shared/model/user';
import { AlertEnum } from 'src/app/shared/enum/alert.enum';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ResponseApi } from 'src/app/shared/model/responseApi';

import { LocalStorageService } from '../../services/localStorage.service';
import { ProfilService } from '../../services/profil.service';
import { SignInService } from 'src/app/core/service/auth/signIn.service';


@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent {
  newUser?: User;
  userResponse?: User;
  responseApi?: ResponseApi;
  isLoggedIn = false;
  passwordVisible = true;
  email: string = "";

  constructor(
    private fb: FormBuilder,
    private signInService: SignInService,
    private alertService: AlertService,
    private localstorageService: LocalStorageService,
    private profilService: ProfilService
  ) { }

  signInForm = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), this.passwordValidator],
    ],
    confirmPassword: [
      '',
      [Validators.required, Validators.minLength(8), this.passwordValidator],
    ],
    phone: ['', [Validators.required, this.phoneValidator]],
  });

  async onSubmitFormSignIn() {
    const password = this.signInForm.get('password')?.value;
    const confirmPassword = this.signInForm.get('confirmPassword')?.value;
    const email = this.signInForm.get('email')?.value;

    if (email) {
      if (await this.verifyEmail(email)) { //TODO vérifier avec Louis si toujours utile, nous gérons dans le back
        this.alertService.setAlert(
          AlertEnum.TYPE_DANGER,
          AlertEnum.MESSAGE_EMAIL_ALREADY_EXIST,
          AlertEnum.TIME_LONG
        );
      } else {
        if (password === confirmPassword) {
          if (this.signInForm.valid) {
            this.newUser = new User(
              this.signInForm.get('firstname')?.value,
              this.signInForm.get('lastname')?.value,
              this.signInForm.get('email')?.value,
              this.signInForm.get('password')?.value,
              this.signInForm.get('phone')?.value
            );
            this.signInService.createUser(this.newUser).subscribe((response) => {
              this.responseApi = response;

              if (this.responseApi.responseValid == true) {
                this.alertService.setAlert(
                  AlertEnum.TYPE_SUCCESS,
                  AlertEnum.MESSAGE_SIGNIN_SUCCESS,
                  AlertEnum.TIME_MEDIUM
                );
              } else {
                this.alertService.setAlert(
                  AlertEnum.TYPE_DANGER,
                  this.responseApi.message,
                  AlertEnum.TIME_MEDIUM
                );
              }
              this.signInForm.reset();
            });
          }
        } else {
          this.alertService.setAlert(
            AlertEnum.TYPE_DANGER,
            AlertEnum.MESSAGE_WRONG_PASSWORD,
            AlertEnum.TIME_INFINITY
          );
        }
      }
    }
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const passwordRegex = RegExp('(?=.*[1-9])');
    const valid = passwordRegex.test(control.value);

    const errors = {
      password: {
        rules: 'Le mot de passe est non conforme',
      },
    };
    return !valid ? errors : null;
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

  private verifyEmail(email: string): Promise<boolean> {
    return new Promise<boolean>((isPresent) => {
      this.signInService.verifyEmail(email).subscribe((emailExists) => {
        isPresent(emailExists);
      });
    });
  }
}


