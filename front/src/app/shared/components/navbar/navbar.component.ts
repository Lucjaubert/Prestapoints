import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage.service';
import { AuthenticationService } from 'src/app/core/service/auth/authentication.service';
import { AlertService } from '../../services/alert.service';
import { AlertEnum } from '../../enum/alert.enum';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalBuildingComponent } from '../modal-building/modal-building.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input()
  isVisible?: boolean;
  inputVisible?: boolean;
  inputSeConnecter?: boolean;
  private isLoggedInSubscription: Subscription = new Subscription();
  private modalRef?: BsModalRef;

  constructor(
    private localstorageService: LocalStorageService,
    private logoutService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthenticationService,
    private modalService: BsModalService
  ) {
    this.inputVisible = false;
    this.inputSeConnecter = true;
  }

  ngOnInit() {
    this.isLoggedInSubscription = this.authService
      .isLoggedIn()
      .subscribe((loggedIn) => {
        if (loggedIn) {
          this.inputVisible = false;
          this.inputSeConnecter = true;
        } else {
          this.inputVisible = true;
          this.inputSeConnecter = false;
        }
      });
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }

  showProposalModal(event: Event): void {
    event.preventDefault();
    this.modalRef = this.modalService.show(ModalBuildingComponent, {
      class: 'modal-md modal-dialog-centered',
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {
        title: 'Profil',
        message: 'Page en cours de création',
      },
    });
  }
  

  logout() {
    this.router.navigate(['/']);
    this.logoutService.logout();
  }
}