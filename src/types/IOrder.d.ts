import { IAddress } from './ICustomer';

export enum orderStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
    REJECTED = 'REJECTED',
}
export interface IProduct {
    productName: string;
    sku: string;
    quantity: number;
    description?: string;
    price: number;
}

interface Address {
    street: string;
    city: string;
    state: string;
    postcode: string;
}

export interface ICustomerInfo {
    name: string;
    email: string;
    phone: string;
    address: IAddress;
}

export interface IOrderUpdate {
    id: string;
    body: {
        status: orderStatus;
    };
}

export default interface IOrder {
    orderId: string;
    customerInfo: ICustomerInfo;
    products: IProduct[];
    dateCreated: Date;
    status: orderStatus;
    invoiceId?: string;
}
