export interface IUser {
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    password?: string;
    confirmedPassword?: string;
    role?: string;
    token?: string | null;
    active?: boolean;
}
