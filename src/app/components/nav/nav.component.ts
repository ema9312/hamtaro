import { Component, OnInit } from '@angular/core';
//import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public appName = 'Hamtaro';
  constructor(/*public authSvc: AuthService*/) {}

  ngOnInit() {}

  onLogout(): void {
    //this.authSvc.logout();
  }
}