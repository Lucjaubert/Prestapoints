import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidatorsService {
  constructor() {}

  DateToDayToString(): String {
    const aujourdHui = new Date();
    const jour = aujourdHui.getDate();
    const mois = aujourdHui.getMonth() + 1; // Les mois commencent à 0
    const annee = aujourdHui.getFullYear();
    return `${jour.toString().padStart(2, '0')}/${mois
      .toString()
      .padStart(2, '0')}/${annee}`;
  }

  // Validation personnalisée pour vérifier la valeur maximale
  validateMaxValue(maxValue: number): ValidatorFn {
    return (control) => {
      const value = control.value;
      if (value > maxValue) {
        return { maxExceeded: true };
      }
      return null;
    };
  }

  dateValidator2(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const dateRegex =
        /^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/;
      const isValid = dateRegex.test(control.value);
      return !isValid ? { invalidDate: { value: control.value } } : null;
    };
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const dateRegex =
        /^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/;
      const isValidFormat = dateRegex.test(control.value);

      if (!isValidFormat) {
        return { invalidDate: { value: control.value } };
      }

      const inputDate = new Date(control.value);
      const currentDate = new Date();

      if (inputDate < currentDate) {
        return { pastDate: { value: control.value } };
      }

      return null; // La date est valide
    };
  }

  timeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      const isValid = timeRegex.test(control.value);
      return !isValid ? { invalidTime: { value: control.value } } : null;
    };
  }

  postalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Expression régulière pour vérifier le format du code postal
      const postalCodeRegex = /^[0-9]{5}$/;
      const isValid = postalCodeRegex.test(control.value);
      return !isValid ? { invalidTime: { value: control.value } } : null;
    };
  }
}
