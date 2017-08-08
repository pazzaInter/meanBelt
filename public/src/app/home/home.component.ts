import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user = new User();

  constructor(private router: Router, private userApi: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userApi.login(this.user)
      .then(user => {
        this.userApi.updateUser(user);
        console.log('added user to observable')
      })
      .then(() => this.router.navigate(['/dashboard']));
    console.log(`${this.user.name} logged in`);
  }
}
