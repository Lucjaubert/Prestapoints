import { Component, Input } from '@angular/core';
import { Alert } from '../../model/alert';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input()
  alert?: Alert;

  @Input()
  index?: number;

  constructor(private alertService: AlertService) {}

  clearAlert(index?: number) {
    this.alertService.clearAlert(index);
  }
}
