import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage.service';
import { ProfilService } from '../../services/profil.service';
import { User } from '../../model/user';
import { ResponseApi } from '../../model/responseApi';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  userUpdate?: User;
  userResponse?: User;
  responseApi?: ResponseApi;
  isLoggedIn = false;
  visible = true;
  email: string = '';
  avatarData: any;
  image: any;

  constructor(
    private fb: FormBuilder,
    private localstorageService: LocalStorageService,
    private profilService: ProfilService
  ) {}

  ngOnInit() {
    this.checkUserLoggedIn();
  }

  checkUserLoggedIn() {
    const value = this.localstorageService.getItem('currentUser');
    if (value != null) {
      this.isLoggedIn = true;
      this.visible = false;
      this.getUser();
    }
  }
  //lastPasswordValidator = (): ValidationErrors | null => {
  //  const passwordForm = this.profilForm.get('lastPassword');
  //  const passwordValue = passwordForm?.value;
  //
  //  if (passwordForm && typeof passwordValue === 'string') {
  //    const passwordsMatch = this.comparePassword();
  //    if (!passwordsMatch) {
  //      const errors = {
  //        lastPassword: {
  //          rules: 'Le mot de passe ne correspond pas à l\'ancien'
  //        }
  //      };
  //      return errors;
  //    }
  //  }
  //  return null;
  //}

  confirmPasswordValidator = (): ValidationErrors | null => {
    const password = this.profilForm.get('password')?.value;
    const passwordConfirm = this.profilForm.get('confirmPassword')?.value;
    var errors = null;

    if (password !== passwordConfirm) {
      errors = {
        confirmPassword: {
          rules: 'Les mots de passe ne sont pas identiques',
        },
      };
    }

    return errors;
  };
  // const passwordRegex = RegExp('(?=.*[1-9])');

  profilForm = this.fb.group({
    firstname: [{ value: '', disabled: true }, [Validators.required]],
    lastname: [{ value: '', disabled: true }, [Validators.required]],
    email: [
      { value: '', disabled: true },
      [Validators.required, Validators.email],
    ],
    password: [
      { value: '', disabled: true },
      [this.confirmPasswordValidator.bind(this)],
    ],
    confirmPassword: [
      { value: '', disabled: true },
      [this.confirmPasswordValidator.bind(this)],
    ],
    phone: [
      { value: '', disabled: true },
      [Validators.required, this.phoneValidator],
    ],
  });

  getUser(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.profilService.getUserConnected().subscribe((response) => {
        this.userResponse = response;
        if (this.userResponse) {
          this.profilForm.patchValue({
            firstname: this.userResponse.firstname,
            lastname: this.userResponse.lastname,
            email: this.userResponse.email,
            phone: this.userResponse.phone,
          });
          this.getImageAvatar();
        }
        resolve();
      });
    });
  }

  resetForm() {
    this.profilForm.get('lastPassword')?.reset();
    this.profilForm.get('password')?.reset();
    this.profilForm.get('confirmPassword')?.reset();
    this.getImageAvatar();
  }

  getImageAvatar() {
    this.profilService.getAvatar().subscribe((data) => {
      this.avatarData = data;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(new Blob([this.avatarData]));
    });
  }

  refreshAvatarImage() {
    this.image = null;
    this.getImageAvatar();
  }

  toggleFormEditability() {
    const formControls = this.profilForm.controls;
    Object.keys(formControls).forEach((key) => {
      const control = formControls[key as keyof typeof formControls];
      if (control.disabled) {
        this.visible = true;
        control.enable();
      } else {
        this.visible = false;
        this.profilForm.get('lastPassword')?.reset();
        this.profilForm.get('password')?.reset();
        this.profilForm.get('confirmPassword')?.reset();
        this.getImageAvatar();
        control.disable();
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmitFormLogin() {
    this.userUpdate = new User();
    const password = this.profilForm.get('password')?.value;
    if (password != null) {
      this.userUpdate.password = this.profilForm.get('password')?.value;
    }
    this.userUpdate.firstname = this.profilForm.get('firstname')?.value;
    this.userUpdate.lastname = this.profilForm.get('lastname')?.value;
    this.userUpdate.email = this.profilForm.get('email')?.value;
    this.userUpdate.phone = this.profilForm.get('phone')?.value;

    const imageFormData = new FormData();

    const imageFile = (document.getElementById('formFile') as HTMLInputElement)
      ?.files?.[0];
    if (imageFile) {
      imageFormData.append('image', imageFile, imageFile.name);
    }
    this.profilService.updateAvatar(imageFormData).subscribe(
      (response) => {
        this.responseApi = response;
        this.refreshAvatarImage();
      },
      (error: HttpErrorResponse) => {}
    );

    this.profilService.updateUser(this.userUpdate).subscribe(
      (response) => {
        this.responseApi = response;
      },
      (error: HttpErrorResponse) => {}
    );
    this.profilForm.get('password')?.reset();
    this.profilForm.get('confirmPassword')?.reset();
    this.toggleFormEditability();
  }

  refreshPage() {
    window.location.reload();
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
}
