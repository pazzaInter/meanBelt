import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs';

@Injectable()
export class UserService {
  userObservable = new BehaviorSubject(null);

  constructor(private http: Http) {}

  updateUser(user: User) {
    return this.userObservable.next(user);
  }
  
  login(user) {
    console.log('going through service');
    return this.http.post('/api/user/login', user)
      .map(response => response.json())
      .toPromise();
  }
  
  logout(): Promise<User> {
    console.log('logging out')
    return this.http.delete('/api/user/logout')
      .map(data => data.json())
      .toPromise();
  }

  grabUsers() {
    return this.http.get('/api/user')
      .map(response => response.json())
      .toPromise();
  }

  grabBucketlist(id) {
    return this.http.get(`/api/user/list/${id}`)
      .map(response => response.json())
      .toPromise();
  }  
}
