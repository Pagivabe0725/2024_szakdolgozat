import { Timestamp } from "@angular/fire/firestore";
import { user } from "../interfaces/user";

export function idGenerator():string{
    return Timestamp.now().toMillis().toString() + localStorage.getItem('userId');
}