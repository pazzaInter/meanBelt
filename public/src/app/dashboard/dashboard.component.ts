import { Component, OnInit } from '@angular/core';
import { BucketItem } from '../bucket-item';
import { UserService } from '../user.service';
import { BucketItemService } from '../bucket-item.service';
import { User } from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bucketItem = new BucketItem();
  user: User;
  users: Array<User>;
  bucketList: Array<BucketItem>;
  taggedList: Array<BucketItem>;

  constructor(private userApi: UserService, private itemApi: BucketItemService) {}

  ngOnInit() {
    this.userApi.grabUsers()
      .then(users => this.users = users)
      .catch(error => console.log(error));
    this.userApi.userObservable.subscribe( (user) => {
      this.user = user;
      this.userApi.grabBucketlist(user._id)
        .then(items => this.bucketList=items.bucketItems)
      this.itemApi.getOtherLists(user._id)
        .then(items => {
          this.taggedList = items;
          console.log('attempting to get tagged list')
        });
    });
  }
  onSubmit(event) {
    this.bucketItem.owner = this.user;
    console.log(this.bucketItem);
    this.itemApi.addItem(this.bucketItem)
      .then(()=>this.userApi.grabBucketlist(this.user._id))
      .then(items => this.bucketList=items.bucketItems);;
    // this.userApi.grabUsers() //why was I running this line????
    //   .then(users => this.users = users)
    //   .catch(error => console.log(error));
    this.bucketItem = new BucketItem();
    event.reset();
  }

  select(id) {
    console.log('selected', id)
  }
}
