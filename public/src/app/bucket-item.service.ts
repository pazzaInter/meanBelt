import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BucketItem } from './bucket-item';
import 'rxjs'

@Injectable()
export class BucketItemService {

  constructor(private http: Http) { }

  addItem(item){
    return this.http.post('/api/bucketitem/', item)
      .map(response => response.json())
      .toPromise();
  }
  getOtherLists(id){
    console.log('attempting to get full list', id)
    return this.http.get(`/api/bucketitem/list/${id}`)
      .map(response => response.json())
      .toPromise();
  }
}