import { AxiosRequestConfig } from 'axios';
import request from '../utils/request';
import ICustomer from '../types/ICustomer';

export const getAllCustomers = () => {
    const config: AxiosRequestConfig = {
        url: 'customers',
        method: 'GET',
    };
    return request(config).then((res) => res.data);
};

export const getCustomerByEmail = (email: string | undefined) => {
    const config: AxiosRequestConfig = {
        url: `customers/${email}`,
        method: 'GET',
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};

export const createCustomer = (body: ICustomer) => {
    const config: AxiosRequestConfig = {
        url: 'customers',
        method: 'POST',
        data: body,
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};

export const updateCustomerByEmail = (email: string, body: ICustomer) => {
    const config: AxiosRequestConfig = {
        url: `customers/${email}`,
        method: 'PUT',
        data: body,
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};

export const deleteCustomerByEmail = (email: string) => {
    const config: AxiosRequestConfig = {
        url: `customers/${email}`,
        method: 'DELETE',
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};
