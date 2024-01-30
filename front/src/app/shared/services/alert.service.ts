import { Injectable } from '@angular/core';
import { Alert } from '../model/alert';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject: Subject<any> = new Subject<any>();
  private readonly storageKey = 'alert';
  public alert$ = this.alertSubject.asObservable();
  private alert: Alert = new Alert();
  private existingAlerts: Alert[] = [];

  constructor() {}

  setAlert(
    type: string,
    message: string,
    duration: number
  ): void {
    this.alert.type = type;
    this.alert.message = message;
    this.alert.duration = duration;

    this.existingAlerts = this.getAlerts() || [];
    const existingIndex = this.existingAlerts.findIndex(alert => {
      return (
        alert.type === this.alert.type &&
        alert.message === this.alert.message &&
        alert.duration === this.alert.duration
      );
    });
    
    if (existingIndex > -1) {
      this.clearAlert(existingIndex);   
    }
    
    this.existingAlerts.unshift(this.alert);
    localStorage.setItem(this.storageKey, JSON.stringify(this.existingAlerts));
    this.showAlert(this.alert.duration);
  }

  getAlerts(): Alert[] {
    const alerts = localStorage.getItem(this.storageKey);
    return alerts ? JSON.parse(alerts) : null;
  }

  clearAlert(index?: number): void {
    this.existingAlerts = this.getAlerts() || [];
    if (this.existingAlerts.length > 0 && index == null) {
      this.existingAlerts.pop();
    } else if (this.existingAlerts.length > 0 && index != null) {
      this.existingAlerts.splice(index,1);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.existingAlerts));
    this.alertSubject.next(this.existingAlerts.length > 0 ? this.existingAlerts : null);
  }

  // clear the popup alert after the time duration
  showAlert(duration: number): void {
    this.alertSubject.next(this.getAlerts());
    setTimeout(() => {
      this.clearAlert(this.existingAlerts.length - 1);
    }, duration);
  }
}
