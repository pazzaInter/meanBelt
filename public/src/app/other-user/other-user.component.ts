import { Component, OnInit } from '@angular/core';
import { BucketItem } from '../bucket-item';
import { UserService } from '../user.service';
import { BucketItemService } from '../bucket-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.css']
})
export class OtherUserComponent implements OnInit {
  bucketList: Array<BucketItem>;
  user;
  viewedUser;

  constructor(
    private _route: ActivatedRoute, 
    private userApi: UserService, 
    private itemApi: BucketItemService) { 
      this._route.paramMap
      .switchMap(params => {
        console.log("OtherUserComponent loaded and url id given is: ", params.get('id'));
        this.viewedUser=params.get('id');
        return this.userApi.grabBucketlist(params.get('id'));       
      }).subscribe(items => this.bucketList = items.bucketItems)
    }

  ngOnInit() {
    this.userApi.userObservable.subscribe( (user) => {
      this.user = user;
    });
  }

  select() {
    console.log('hello')
  }
}
