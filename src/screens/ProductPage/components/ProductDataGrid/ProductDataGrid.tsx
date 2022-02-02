import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton } from '@mui/material';
import DataGridTable from '../../../../components/DataGridTable';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
    fetchAllProducts,
    selectProducts,
    selectProductStatus,
} from '../../../../store/slices/productSlice';
import IProduct from '../../../../types/IProduct';
import { capitalizor, quantityToStatus } from '../../../../utils/dataProcessor';
import {
    PrimaryKeyLayout,
    MoneyTag,
} from '../../../../components/DataGridTable/components/DataGridCells/DataGridCells';
import StatusBar from '../../../../components/StatusBar';

const columnDef: GridColDef[] = [
    {
        field: 'productName',
        headerName: 'NAME',
        flex: 4,
        valueGetter: (params) => params.row.productName,
        renderCell: (params: GridRenderCellParams) => (
            <PrimaryKeyLayout
                primary={`${capitalizor(params.row.productName)}`}
                secondary={`in ${params.row.category.toUpperCase()}`}
                linkAddress={`${params.row.sku}`}
            />
        ),
    },
    {
        field: 'price',
        headerName: 'PRICE',
        type: 'number',
        renderCell: (params) => <MoneyTag amount={params.row.price} />,
        flex: 2,
    },
    { field: 'quantity', headerName: 'QUANTITY', type: 'number', flex: 1 },
    {
        field: 'status',
        headerName: 'STATUS',
        valueGetter: (params) => quantityToStatus(params.row.quantity),
        renderCell: (params: GridRenderCellParams) => (
            <StatusBar status={quantityToStatus(params.row.quantity)} />
        ),
        flex: 1,
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'ACTIONS',
        flex: 1,
        renderCell: (params) => (
            <Box>
                <Link to={`${params.row.sku}`}>
                    <IconButton style={{ padding: '15px' }} aria-label="edit">
                        <VisibilityIcon />
                    </IconButton>
                </Link>
                <Link to={`${params.row.sku}/edit`}>
                    <IconButton style={{ padding: '15px' }} aria-label="edit">
                        <EditIcon />
                    </IconButton>
                </Link>
            </Box>
        ),
    },
];
const ProductDataGrid = () => {
    const products: IProduct[] = useAppSelector(selectProducts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    return (
        <DataGridTable
            rows={products}
            columns={columnDef.map((row) => ({
                headerClassName: 'super-app-theme--header',
                ...row,
            }))}
            statusSelector={selectProductStatus}
        />
    );
};

export default ProductDataGrid;
