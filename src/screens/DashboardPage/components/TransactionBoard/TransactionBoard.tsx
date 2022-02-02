import * as React from 'react';
import { useEffect } from 'react';
import { GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import DataGridTable from '../../../../components/DataGridTable';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
    fetchAllOrders,
    selectedAllOrders,
    selectOrderStatus,
} from '../../../../store/slices/orderSlice';
import IOrder, { IProduct } from '../../../../types/IOrder';
import { MoneyTag } from '../../../../components/DataGridTable/components/DataGridCells/DataGridCells';
import StatusBar from '../../../../components/StatusBar';
import styles from './TransactionBoard.module.scss';

const countTotalPrice = (params: GridValueGetterParams): number => {
    const total: number = params.row.products.reduce(
        (prevValue: number, p: IProduct) => prevValue + p.quantity * p.price,
        0,
    );
    return total;
};

const orderColumnDef: GridColDef[] = [
    {
        field: 'dateCreated',
        headerName: 'DATE',
        type: 'dateTime',
        valueGetter: (params: GridValueGetterParams) => {
            const value = new Date(params.row.dateCreated);
            return value.toISOString().slice(0, 10).split('-').reverse().join('/');
        },
        flex: 3,
    },
    {
        field: 'products',
        headerName: 'PRODUCT',
        valueGetter: () => {
            const value = 'iPhone 12 Pro';
            return value;
        },
        flex: 3,
    },
    {
        field: 'totalPrice',
        headerName: 'PRICE',
        type: 'number',
        renderCell: (params: GridRenderCellParams) => {
            const value = countTotalPrice(params);
            return <MoneyTag amount={value} />;
        },
        valueGetter: countTotalPrice,
        flex: 3,
    },
    {
        field: 'status',
        headerName: 'STATUS',
        renderCell: (params: GridRenderCellParams) => <StatusBar status={params.row.status} />,
        flex: 3,
    },
];

const TransactionBoard: React.FC = () => {
    const orders: IOrder[] = useAppSelector(selectedAllOrders);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    return (
        <div className={styles.transactionboard}>
            <DataGridTable
                rows={orders}
                columns={orderColumnDef.map((row) => ({
                    headerClassName: `super-app-theme--header`,
                    ...row,
                }))}
                statusSelector={selectOrderStatus}
            />
        </div>
    );
};

export default TransactionBoard;
