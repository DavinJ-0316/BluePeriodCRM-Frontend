export interface IAddress {
    street: string;
    city: string;
    state: string;
    postcode: string;
}

enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other',
    NOTTOTELL = 'Not to tell',
}

enum Notification {
    SMS = 'SMS',
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
}
export default interface ICustomer {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: IAddress;
    dob?: Date;
    notification?: Notification;
    gender: Gender;
    spending?: number;
    orderAccumulation?: number;
}
