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
import styles from './InvoiceDataGrid.module.scss';

const invoiceColumnDef: GridColDef[] = [
    {
        field: 'invoiceId',
        headerName: 'ID',
        flex: 4,
        renderCell: (params: GridRenderCellParams) => {
            const nameInChar = `${params.row.customerInfo.name.split(' ')[0][0]}${
                params.row.customerInfo.name.split(' ')[1][0]
            }`;
            return (
                <div className={styles.invoiceAvatar}>
                    <Avatar className={styles.invoiceAvatar_avatar}>{nameInChar}</Avatar>
                    <div>
                        <Link to={params.row.invoiceId}>
                            <Button className={styles.invoiceAvatar_primary}>
                                {params.row.invoiceId}
                            </Button>
                        </Link>
                        <Link to={`/customers/${params.row.customerInfo.email}`}>
                            <div className={styles.invoiceAvatar_secondary}>
                                <p>{params.row.customerInfo.name}</p>
                            </div>
                        </Link>
                    </div>
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
        flex: 2,
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'ACTIONS',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => (
            <Box>
                <Link to={`${params.row.invoiceId}`}>
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
        <div>
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

export default InvoiceDataGrid;
