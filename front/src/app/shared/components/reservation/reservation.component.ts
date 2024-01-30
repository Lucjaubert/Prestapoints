import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Prestation } from '../../model/prestation';
import { DatePipe } from '@angular/common';
import { PrestationService } from '../../services/prestation.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ResponseApi } from 'src/app/shared/model/responseApi';
import { AlertEnum } from 'src/app/shared/enum/alert.enum';
import { ProfilService } from '../../services/profil.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent {
  @Input()
  public prestation?: Prestation;

  @Output()
  public needToRefresh: EventEmitter<boolean> = new EventEmitter();

  public isRegistered?: boolean;
  public responseApi?: ResponseApi;
  public userConnected?: User;

  constructor(
    public prestationService: PrestationService,
    public alertService: AlertService,
    public profilService: ProfilService
  ) {}

  ngOnInit() {
    this.profilService.getUserConnected().subscribe((userConnected) => {
      this.userConnected = userConnected;
      this.verifyRegistration();
    });
  }

  verifyRegistration() {
    if (this.prestation?.registrations != null) {
      this.isRegistered = this.prestation.registrations.filter(
        (r) => r.user?.email === this.userConnected?.email
      ).length > 0;
    }
  }

  undoRegistration(id: number | undefined) {
    this.prestationService.undoRegistration(id).subscribe((response) => {
      this.responseApi = response;

      if (this.responseApi.responseValid == true) {
        this.alertService.setAlert(
          AlertEnum.TYPE_SUCCESS,
          AlertEnum.MESSAGE_RESERVATION_DELETE,
          AlertEnum.TIME_MEDIUM
        );

        this.isRegistered = false;
        this.needToRefresh.emit(true);
      } else {
        this.alertService.setAlert(
          AlertEnum.TYPE_DANGER,
          this.responseApi.message,
          AlertEnum.TIME_MEDIUM
        );
      }
    });
  }

  addRegistration(id: number | undefined) {
    this.prestationService.addRegistration(id).subscribe((response) => {
      this.responseApi = response;

      if (this.responseApi.responseValid == true) {
        this.alertService.setAlert(
          AlertEnum.TYPE_SUCCESS,
          AlertEnum.MESSAGE_RESERVATION_SUCCESS,
          AlertEnum.TIME_MEDIUM
        );

        this.needToRefresh.emit(true);
      } else {
        this.isRegistered = true;
        this.alertService.setAlert(
          AlertEnum.TYPE_DANGER,
          this.responseApi.message,
          AlertEnum.TIME_MEDIUM
        );
      }
    });
  }
}
