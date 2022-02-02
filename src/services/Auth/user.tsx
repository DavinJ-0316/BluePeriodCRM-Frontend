import { AxiosRequestConfig } from 'axios';
import request from '../../utils/request';
import { IUser } from '../../types/IUser';

export const signup = async (body: IUser) => {
    const config: AxiosRequestConfig = {
        url: 'users/signup',
        method: 'POST',
        data: body,
    };
    return request(config)
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }

            return response.data;
        })
        .catch((error) => error);
};

export const signin = async (body: IUser) => {
    const config: AxiosRequestConfig = {
        url: 'users/login',
        method: 'POST',
        data: body,
    };
    return request(config)
        .then((response) => {
            if (response.status === 200) {
                localStorage.setItem('AUTH_TOKEN', response.headers.authorization);
                localStorage.setItem('USER', JSON.stringify(response.data.user) as string);
                return response.data;
            }
            return response.data;
        })
        .catch((error) => error);
};

export const logout = () => {
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('USER');
};

export const verify = async (token: string | null) => {
    const config: AxiosRequestConfig = {
        url: 'users/verifyEmail',
        method: 'GET',
        params: { token },
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};

export const forgotPassword = async (body: Partial<IUser>) => {
    const config: AxiosRequestConfig = {
        url: 'users/forgotPassword',
        method: 'POST',
        data: body,
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};

export const resetPassword = async (body: Partial<IUser>) => {
    const config: AxiosRequestConfig = {
        url: 'users/resetPassword',
        method: 'PATCH',
        data: body,
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};

export const getAllUsers = () => {
    const config: AxiosRequestConfig = {
        url: 'users',
        method: 'GET',
    };
    return request(config).then((res) => res.data);
};

export const getUserByEmail = (email: string | undefined) => {
    const config: AxiosRequestConfig = {
        url: `users/${email}`,
        method: 'GET',
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};

export const updateUserByEmail = (email: string, body: IUser) => {
    const config: AxiosRequestConfig = {
        url: `users/${email}`,
        method: 'PUT',
        data: body,
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};

export const deleteUserByEmail = (email: string) => {
    const config: AxiosRequestConfig = {
        url: `users/${email}`,
        method: 'DELETE',
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};

export const updateMeByEmail = (body: IUser) => {
    const config: AxiosRequestConfig = {
        url: `users/updateMe`,
        method: 'PATCH',
        data: body,
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};

export const deleteMeByEmail = (body: Partial<IUser>) => {
    const config: AxiosRequestConfig = {
        url: `users/deleteMe`,
        method: 'PATCH',
        data: body,
    };
    return request(config)
        .then((res) => {
            if (res.status === 204) {
                localStorage.removeItem('AUTH_TOKEN');
                localStorage.removeItem('USER');
                return res.data;
            }
            return res.data;
        })
        .catch((error) => error);
};

export const updatePassword = (body: Partial<IUser>) => {
    const config: AxiosRequestConfig = {
        url: 'users/updateMyPassword',
        method: 'PATCH',
        data: body,
    };
    return request(config)
        .then((res) => res.data)
        .catch((error) => error);
};
