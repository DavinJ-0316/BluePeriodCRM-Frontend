import { IProduct, ICustomerInfo } from './IOrder';

export default interface IInvoice {
    invoiceId: string;
    orderId: string;
    dateCreated: Date;
    dateDue: Date;
    products: IProduct[];
    customerInfo: ICustomerInfo;
}
