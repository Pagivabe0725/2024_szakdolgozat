import { user } from "../interfaces/user";

export function author(user:user):string{
    return user.lastName+' '+user.firstName
}