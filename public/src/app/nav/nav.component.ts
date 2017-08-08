import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user;
  
  constructor(private router: Router, private userApi: UserService) { }

  ngOnInit() {
    this.userApi.userObservable.subscribe( (user) => {
      this.user = user;
    });
  }
  logout() {
    this.userApi.logout()
      .then(() => this.router.navigate(['']))
      .catch(() => {});
  }
}
