import { Timestamp } from '@angular/fire/firestore';
import { user } from './user';

export interface work {
  id: string;
  userId: string;
  name: string;
  author: user;
  created: Timestamp;
  modified: Timestamp;
  finished: boolean;
  members: Array<string>;
}
