import * as React from 'react';
import { Box, LinearProgress } from '@mui/material';
import { DataGrid, GridColDef, GridOverlay } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../hooks/redux';
import { selectFilters, selectLocalFilters } from '../../store/slices/filterSlice';
import styles from './DataGridTable.module.scss';
import IFilter from '../../types/IFilter';
import { RootState } from '../../interfaces/redux';

const StyledDataGrid = styled(DataGrid)`
    &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus,
    &.MuiDataGrid-root .MuiDataGrid-cell:focus,
    &.MuiDataGrid-root .MuiDataGrid-cell:focus-within {
        outline: none;
    }
`;
export interface IRow {
    [key: string]: any;
}
interface IDataGridTableProps {
    rows: IRow[];
    columns: GridColDef[];
    statusSelector: (state: RootState) => any;
}
const CustomLoadingOverlay = () => (
    <GridOverlay>
        <div className={styles.loadingLayout}>
            <LinearProgress />
        </div>
    </GridOverlay>
);

const DataGridTable: React.FC<IDataGridTableProps> = (props) => {
    const { rows, columns, statusSelector } = props;
    const filterModel = useAppSelector(selectFilters);
    const localFilters: IFilter[] = useAppSelector(selectLocalFilters);
    const loadingStatus = useAppSelector(statusSelector);

    let newRow: IRow[];
    // if local Filter has required filter
    if (localFilters.length !== 0) {
        // filter all rows by requirements
        newRow = rows.filter((row) => {
            // map all filter, to list of booleans
            const fullFills: boolean[] = localFilters.map((filter: IFilter) => {
                if (row[filter.field] === undefined) return true;
                return row[filter.field].toLowerCase().includes(filter.query);
            });
            // reduce list of booleans to true or false values
            return fullFills.reduce((a: boolean, b: boolean) => a && b);
        });
    } else {
        newRow = rows;
    }

    return (
        <Box
            sx={{
                width: 1,
                '& .super-app-theme--header': {
                    backgroundColor: '#F3F4F6',
                },
            }}
            className={styles.table_background}
        >
            <StyledDataGrid
                autoHeight
                rows={newRow}
                getRowId={(row) => row._id}
                columns={columns}
                pageSize={10}
                pagination
                rowHeight={80}
                filterModel={filterModel}
                disableColumnSelector
                disableDensitySelector
                disableSelectionOnClick
                disableColumnMenu
                loading={loadingStatus === 'loading'}
                components={{
                    LoadingOverlay: CustomLoadingOverlay,
                }}
            />
        </Box>
    );
};

export default DataGridTable;
