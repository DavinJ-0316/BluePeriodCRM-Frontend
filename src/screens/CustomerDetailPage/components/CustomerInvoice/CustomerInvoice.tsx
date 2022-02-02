import * as React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Box, Button, Avatar } from '@mui/material';
import DataGridTable from '../../../../components/DataGridTable';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
    fetchAllInvoices,
    selectedAllInvoices,
    selectInvoiceStatus,
} from '../../../../store/slices/invoiceSlice';
import IInvoice from '../../../../types/IInvoice';
import { countTotalPrice } from '../../../../utils/dataProcessor';
import { MoneyTag } from '../../../../components/DataGridTable/components/DataGridCells/DataGridCells';
import styles from './CustomerInvoice.module.scss';
import { cleanUpFilters, updateFilter } from '../../../../store/slices/filterSlice';

const invoiceColumnDef: GridColDef[] = [
    {
        field: 'email',
        headerName: 'ID',
        flex: 4,
        sortable: false,
        valueGetter: (params: GridValueGetterParams) => params.row.customerInfo.email,
        renderCell: (params: GridRenderCellParams) => {
            const nameInChar = `${params.row.customerInfo.name.split(' ')[0][0]}${
                params.row.customerInfo.name.split(' ')[1][0]
            }`;
            return (
                <div className={styles.invoiceAvatar}>
                    <Avatar className={styles.invoiceAvatar_avatar}>{nameInChar}</Avatar>
                    <Link to={`/invoices/${params.row.invoiceId}`}>
                        <Button className={styles.invoiceAvatar_primary}>
                            {params.row.invoiceId}
                        </Button>
                    </Link>
                </div>
            );
        },
    },
    {
        field: 'dateCreated',
        headerName: 'ISSUED',
        type: 'dateTime',
        sortingOrder: ['desc', 'asc', null],
        valueGetter: (params: GridValueGetterParams) => {
            const value = new Date(params.row.dateCreated);
            return value;
        },
        flex: 2,
    },
    {
        field: 'dateDue',
        headerName: 'DUE',
        type: 'dateTime',
        sortingOrder: ['desc', 'asc', null],
        valueGetter: (params: GridValueGetterParams) => {
            const value = new Date(params.row.dateCreated);
            return value;
        },
        flex: 2,
    },
    {
        field: 'totalPrice',
        headerName: 'TOTAL',
        type: 'number',
        renderCell: (params: GridRenderCellParams) => {
            const value = countTotalPrice(params);
            return <MoneyTag amount={value} />;
        },
        valueGetter: countTotalPrice,
        flex: 1,
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'ACTIONS',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => (
            <Box>
                <Link to={`/invoices/${params.row.invoiceId}`}>
                    <IconButton style={{ padding: '15px' }} aria-label="edit">
                        <EditIcon />
                    </IconButton>
                </Link>
            </Box>
        ),
    },
];

const InvoiceDataGrid: React.FC = () => {
    const invoices: IInvoice[] = useAppSelector(selectedAllInvoices);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllInvoices());
    }, [dispatch]);

    return (
        <div className={styles.datagrid}>
            <DataGridTable
                rows={invoices || []}
                columns={invoiceColumnDef.map((row) => ({
                    headerClassName: 'super-app-theme--header',
                    ...row,
                }))}
                statusSelector={selectInvoiceStatus}
            />
        </div>
    );
};

interface ICustomerInvoiceProps {
    email: string;
}

const CustomerInvoice: React.FC<ICustomerInvoiceProps> = (props: ICustomerInvoiceProps) => {
    const dispatch = useAppDispatch();
    const { email } = props;
    useEffect(() => {
        dispatch(updateFilter({ id: 'email', query: email }));
        return () => {
            dispatch(cleanUpFilters());
        };
    }, [dispatch, email]);
    return <InvoiceDataGrid />;
};

export default CustomerInvoice;
