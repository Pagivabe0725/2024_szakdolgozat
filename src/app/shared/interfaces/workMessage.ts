import { Timestamp } from "@angular/fire/firestore";
import { user } from "./user";
import { workComment } from "./workComment";

export interface workMessage {
    id:string,
    userId:string,
    content: string,
    commentArray:workComment[],
    dateOfCreation: Timestamp
}