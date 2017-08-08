import { BucketItem } from './bucket-item';

export class User {
  _id: string;
  name: string;
  bucketList: Array<BucketItem>;
}