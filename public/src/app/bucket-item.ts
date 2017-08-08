import { User } from './user';

export class BucketItem {
  owner: User;
  title: string;
  description: string;
  done: boolean = false;
  taggedUser?: User;
}