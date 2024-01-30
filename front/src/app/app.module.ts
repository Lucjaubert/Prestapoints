import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { ProfilComponent } from './shared/components/profil/profil.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { FormUserModule } from './shared/components/form-user/form-user.module';
import { LocalStorageService } from './shared/services/localStorage.service';
import { ProfilService } from './shared/services/profil.service';
import { CategoryService } from './shared/services/category.service';
import { AuthInterceptor } from './core/service/auth/auth.interceptor';
import { AuthenticationService } from './core/service/auth/authentication.service';
import { UserService } from './shared/services/user.service';
import { ToolsService } from './shared/services/tools.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CategoryDetailsModule } from './shared/components/category-details/category-details.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    AlertComponent,
    ProfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FormUserModule,
    SharedModule,
    CategoryDetailsModule,
    ModalModule.forRoot(),
  ],
  providers: [
    FormBuilder,
    { provide: LOCALE_ID, useValue: 'fr' },
    LocalStorageService,
    ProfilService,
    CategoryService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthenticationService,
    UserService,
    ToolsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

registerLocaleData(localeFr);
