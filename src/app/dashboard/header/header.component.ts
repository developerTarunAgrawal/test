import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/service/data-sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private dataSharingService: DataSharingService) { }

  ngOnInit() {
  }
  public logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
    this.dataSharingService.userDetails.next('');
    this.dataSharingService.isUserLoggedIn.next(false);
    sessionStorage.setItem('LoggedInStatus', "false");
    this.router.navigate(['/']);
  }
}
