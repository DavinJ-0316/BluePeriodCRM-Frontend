import { GridValueGetterParams } from '@mui/x-data-grid';
import { TStatus } from '../components/StatusBar/StatusBar';
import { Address, IProduct } from '../types/IOrder';

export const capitalizor = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const DateToDDMMMYYYYHHMM = (date: Date): string => {
    const dateSplited = new Date(date).toString().split(' ');
    const output: string = [dateSplited[2], dateSplited[1], dateSplited[3], dateSplited[4]].join(
        ' ',
    );
    return output;
};

export const addressInline = (address: Address): string =>
    address ? `${address.street}, ${address.city}, ${address.state}, ${address.postcode}` : '';

export const quantityToStatus = (quantity: number): TStatus => {
    if (quantity === 0) return 'OUT OF STOCK';
    if (quantity <= 10) return 'LIMITED';
    return 'IN STOCK';
};
export const countTotalPrice = (params: GridValueGetterParams): number => {
    const total: number = params.row.products.reduce(
        (prevValue: number, p: IProduct) => prevValue + p.quantity * p.price,
        0,
    );
    return total;
};
