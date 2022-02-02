import { AxiosRequestConfig } from 'axios';
import IInvoice from '../types/IInvoice';
import request, { requestPDF } from '../utils/request';

export const getAllInvoices = () => {
    const config: AxiosRequestConfig = {
        url: 'invoices',
        method: 'GET',
    };
    return request(config).then((res) => res.data);
};

export const getInvoiceById = (id: string | undefined) => {
    const config: AxiosRequestConfig = {
        url: `invoices/${id}`,
        method: 'GET',
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};

export const getPDFBuffer = (body: IInvoice) => {
    const config: AxiosRequestConfig = {
        url: `invoice`,
        method: 'POST',
        data: body,
    };
    return requestPDF(config)
        .then((res) => res.data)
        .catch((error) => error);
};
