import { Component, OnInit } from '@angular/core';
import '/node_modules/bootstrap/dist/js/bootstrap.min.js';
import { Alert } from './shared/model/alert';

import { Location } from '@angular/common';
import { AlertService } from './shared/services/alert.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'front';
  alerts: Alert[] = [];
  isVisible?: boolean;

  constructor(
    private alertService: AlertService,
    public location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.alertSubscription();
    // Écoute les événements de navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Vérifie l'URL et met à jour isVisible en conséquence
        this.isVisible = event.url === '/auth' ? false : true;
      }
    });
  }

  alertSubscription() {
    this.alertService.alert$.subscribe((alerts) => {
      this.alerts = alerts;
    });
  }

  clearAlert() {
    this.alertService.clearAlert();
  }
}
