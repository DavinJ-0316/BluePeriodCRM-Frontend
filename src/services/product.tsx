import { AxiosRequestConfig } from 'axios';
import request from '../utils/request';
import IProduct from '../types/IProduct';

export const getAllProducts = () => {
    const config: AxiosRequestConfig = {
        url: 'products',
        method: 'GET',
    };
    return request(config).then((res) => res.data);
};

export const getProductBySku = (sku: string | undefined) => {
    const config: AxiosRequestConfig = {
        url: `products/${sku}`,
        method: 'GET',
    };
    return request(config)
        .then((res) => res.data.message)
        .catch((error) => error);
};

export const createProduct = (body: IProduct) => {
    const config: AxiosRequestConfig = {
        url: `products`,
        method: 'POST',
        data: body,
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};

export const updateProductBySku = (sku: string, body: Partial<IProduct>) => {
    const config: AxiosRequestConfig = {
        url: `products/${sku}`,
        method: 'PUT',
        data: body,
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};

export const deleteProductBySku = (sku: string) => {
    const config: AxiosRequestConfig = {
        url: `products/${sku}`,
        method: 'DELETE',
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};
