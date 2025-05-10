import { Timestamp } from "@angular/fire/firestore";
import { user } from "./user";

export interface workComment{
    id:string,
    author:user,
    content:string,
    dateOfCreation:Timestamp
}