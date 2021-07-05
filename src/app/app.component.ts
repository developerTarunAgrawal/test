import { Component } from '@angular/core';
import { AuthGuardService } from './service/auth-guard.service';
import { DataSharingService } from './service/data-sharing.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pract';
  public isUserLoggedIn: boolean = false;
  constructor(private dataSharingService: DataSharingService, private auth: AuthGuardService) {
    this.dataSharingService.userDetails.subscribe(value => {
      if (value) {
        this.dataSharingService.isUserLoggedIn.next(true);
      } else if (this.auth.CheckLoginStatus) {
        this.dataSharingService.isUserLoggedIn.next(true);
      }
    });

    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
  }
  ngOnInit() {

  }
}
