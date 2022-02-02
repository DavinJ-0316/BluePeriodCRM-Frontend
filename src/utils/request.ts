import axios, { AxiosRequestConfig } from 'axios';

let baseURL: string;
if (process.env.NODE_ENV === 'production') {
    baseURL = 'https://alb.blueperiod.link/api/';
} else if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:3000/api/';
} else {
    baseURL = 'https://alb.devilscrm.link/api/';
}

let lambdaURl: string;
if (process.env.NODE_ENV === 'production') {
    lambdaURl = 'https://j4ycvsy4mj.execute-api.ap-southeast-2.amazonaws.com/production/';
} else {
    lambdaURl = 'https://qfc4gfhiy7.execute-api.us-east-2.amazonaws.com/UAT/';
}

const withCredentials = true;
const timeout = 30000;
/**
 * Requests a path, returning a promise.
 *
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export default function request(options: AxiosRequestConfig) {
    const axiosInstance = axios.create({
        baseURL,
        withCredentials,
        timeout,
    });
    return axiosInstance(options)
        .then((response) => response)
        .catch((error) => error.response);
}

export function requestPDF(options: AxiosRequestConfig) {
    const axiosInstance = axios.create({
        baseURL: lambdaURl,
        timeout,
    });
    return axiosInstance(options)
        .then((response) => response)
        .catch((error) => error.response);
}
