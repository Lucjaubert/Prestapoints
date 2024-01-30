import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { FormUserModule } from 'src/app/shared/components/form-user/form-user.module';


@NgModule({
  declarations: [AuthComponent, LogInComponent, SignInComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule, FormUserModule],
 
})
export class AuthModule {}
