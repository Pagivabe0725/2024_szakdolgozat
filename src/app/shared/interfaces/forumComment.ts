import { Timestamp } from '@angular/fire/firestore';

export interface forumComment {
  content: string;
  id: string;
  userid: string;
  author: string;
  date: Timestamp;
}

