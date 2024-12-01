import { Timestamp } from "@angular/fire/firestore";

export interface forum {
  title: string;
  id: string;
  userId:string;
  text: string;
  author: string;
  date:Timestamp;
  commentsIdArray:Array<string>,
  dislikeArray:Array<string>,
  likeArray:Array<string>,
  category:string;
}
