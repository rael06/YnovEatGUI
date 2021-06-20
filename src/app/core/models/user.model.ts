import { Role } from "./role.model";

export class User {
    firstName?: string;
    lastName?: string;
    username: string;
    role: Role;
    token?: string;
}
