import { AxiosRequestConfig } from 'axios';
import request from '../utils/request';
import { orderStatus } from '../types/IOrder';

export const getAllOrders = () => {
    const config: AxiosRequestConfig = {
        url: 'orders',
        method: 'GET',
    };
    return request(config).then((res) => res.data);
};

export const getOrderById = (id: string | undefined) => {
    const config: AxiosRequestConfig = {
        url: `orders/${id}`,
        method: 'GET',
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};

export const updateOrderStatusById = (id: string, body: { status: orderStatus }) => {
    const config: AxiosRequestConfig = {
        url: `orders/${id}`,
        method: 'PUT',
        data: body,
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};
