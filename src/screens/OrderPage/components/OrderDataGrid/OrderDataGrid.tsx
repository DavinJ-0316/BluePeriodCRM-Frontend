import * as React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Box, Button } from '@mui/material';
import DataGridTable from '../../../../components/DataGridTable';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
    fetchAllOrders,
    selectedAllOrders,
    selectOrderStatus,
} from '../../../../store/slices/orderSlice';
import IOrder from '../../../../types/IOrder';
import { capitalizor, countTotalPrice } from '../../../../utils/dataProcessor';
import {
    PrimaryKeyLayout,
    MoneyTag,
} from '../../../../components/DataGridTable/components/DataGridCells/DataGridCells';
import StatusBar from '../../../../components/StatusBar';
import styles from './OrderDataGrid.module.scss';

const orderColumnDef: GridColDef[] = [
    {
        field: 'orderId',
        headerName: 'ID',
        flex: 3,
        renderCell: (params: GridRenderCellParams) => (
            <Link to={params.row.orderId}>
                <Button className={styles.primary}>{params.row.orderId}</Button>
            </Link>
        ),
    },
    {
        field: 'customer',
        headerName: 'CUSTOMER',
        renderCell: (params: GridRenderCellParams) => (
            <PrimaryKeyLayout
                primary={`${capitalizor(params.row.customerInfo.name) || ''}`}
                secondary={`${params.row.customerInfo.email}`}
                linkAddress={`/customers/${params.row.customerInfo.email}`}
            />
        ),
        valueGetter: (params: GridValueGetterParams) => params.row.customerInfo.name,
        flex: 3,
    },
    {
        field: 'dateCreated',
        headerName: 'DATE',
        type: 'dateTime',
        sortingOrder: ['desc', 'asc', null],
        valueGetter: (params: GridValueGetterParams) => {
            const value = new Date(params.row.dateCreated);
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
        flex: 2,
    },
    {
        field: 'status',
        headerName: 'STATUS',
        renderCell: (params: GridRenderCellParams) => <StatusBar status={params.row.status} />,
        flex: 2,
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'ACTIONS',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => (
            <Box>
                <Link to={`${params.row.orderId}`}>
                    <IconButton style={{ padding: '15px' }} aria-label="edit">
                        <EditIcon />
                    </IconButton>
                </Link>
            </Box>
        ),
    },
];

const OrderDataGrid: React.FC = () => {
    const orders: IOrder[] = useAppSelector(selectedAllOrders);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    return (
        <div>
            <DataGridTable
                rows={orders}
                columns={orderColumnDef.map((row) => ({
                    headerClassName: 'super-app-theme--header',
                    ...row,
                }))}
                statusSelector={selectOrderStatus}
            />
        </div>
    );
};

export default OrderDataGrid;
