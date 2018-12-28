<<<<<<< HEAD
=======
import { Router, NavigationStart, NavigationEnd, Event, NavigationCancel, NavigationError } from '@angular/router';
>>>>>>> c8dcffd66ece7168d4bd22500fa85f63747c699d
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
<<<<<<< HEAD
  title = 'AngularCrud';
=======
  showLoadingIndicator = true
  title = 'AngularCrud';
  constructor(private _router: Router) {
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
        this.showLoadingIndicator = false;
      }
    })
  }
>>>>>>> c8dcffd66ece7168d4bd22500fa85f63747c699d
}
