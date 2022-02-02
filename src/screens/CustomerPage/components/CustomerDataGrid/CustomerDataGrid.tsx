import * as React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DataGridTable from '../../../../components/DataGridTable';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
    fetchAllCustomers,
    selectCustomers,
    selectCustomerStatus,
} from '../../../../store/slices/customerSlice';
import ICustomer from '../../../../types/ICustomer';
import styles from './CustomerDataGrid.module.scss';
import { capitalizor } from '../../../../utils/dataProcessor';
import PrimarySecondaryTitle from '../../../../components/DataGridTable/components/DataGridCells';

function getFullName(params: GridValueGetterParams) {
    return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
}

const columnDef: GridColDef[] = [
    {
        field: 'fullName',
        headerName: 'NAME',
        flex: 3,
        valueGetter: getFullName,
        renderCell: (params: GridRenderCellParams) => (
            <PrimarySecondaryTitle
                primary={`${capitalizor(params.row.firstName) || ''} 
            ${capitalizor(params.row.lastName) || ''}`}
                secondary={`${params.row.email}`}
                linkAddress={`${params.row.email}`}
            />
        ),
    },
    {
        field: 'address',
        headerName: 'ADDRESS',
        flex: 4,
        sortable: false,
        valueGetter: (params) =>
            `${params.row.address.street || ''}, 
            ${params.row.address.city || ''}, 
            ${params.row.address.state || ''}, 
            ${params.row.address.postcode || ''}`,
    },
    {
        field: 'phone',
        headerName: 'PHONE',
        flex: 3,
    },
    {
        field: 'gender',
        headerName: 'GENDER',
        flex: 1,
        valueGetter: (params) => `${capitalizor(params.row.gender)}`,
    },
    {
        field: 'orderAccumulation',
        headerName: 'ORDERS',
        type: 'number',
        flex: 1,
    },
    {
        field: 'totalSpent',
        headerName: 'SPENT',
        renderCell: (params) => (
            <div>
                <p className={styles.dollar_color}>{`$${params.row.totalSpent}`}</p>
            </div>
        ),
        flex: 1.5,
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'ACTIONS',
        flex: 1,
        renderCell: (params) => (
            <Box>
                <Link to={`${params.row.email}`}>
                    <IconButton style={{ padding: '15px' }} aria-label="edit">
                        <VisibilityIcon />
                    </IconButton>
                </Link>
                <Link to={`${params.row.email}/edit`}>
                    <IconButton style={{ padding: '15px' }} aria-label="edit">
                        <EditIcon />
                    </IconButton>
                </Link>
            </Box>
        ),
    },
];

const CustomerDataGrid: React.FC = () => {
    const customers: ICustomer[] = useAppSelector(selectCustomers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllCustomers());
    }, [dispatch]);

    return (
        <DataGridTable
            rows={customers}
            columns={columnDef.map((row) => ({
                headerClassName: 'super-app-theme--header',
                ...row,
            }))}
            statusSelector={selectCustomerStatus}
        />
    );
};

export default CustomerDataGrid;
