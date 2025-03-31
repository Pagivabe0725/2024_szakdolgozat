import { user } from "./user";
import { workComment } from "./workComment";

export interface workMessage {
    id:string,
    userId:string,
    content: string,
    group: user[],
    commentArray:workComment[],
}