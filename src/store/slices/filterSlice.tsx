import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GridFilterModel } from '@mui/x-data-grid';
import { RootState } from '../../interfaces/redux';
import IFilter from '../../types/IFilter';

interface IFilterState {
    filters: GridFilterModel;
    localFilters: IFilter[];
}

const initialState: IFilterState = {
    filters: { items: [] },
    localFilters: [],
};

export const filterModelSlice = createSlice({
    name: 'filterModels',
    initialState,
    reducers: {
        // if filter doesn't exist, create filter. if filter exist, update with new query value
        updateFilter: (state, action: PayloadAction<{ id: string; query: string }>) => {
            const selectedFilter = state.filters.items.find(({ id }) => id === action.payload.id);
            if (selectedFilter === undefined) {
                state.filters.items.push({
                    id: action.payload.id,
                    columnField: action.payload.id,
                    value: action.payload.query,
                    operatorValue: 'contains',
                });
            } else {
                selectedFilter.value = action.payload.query;
            }
        },
        cleanUpFilters: (state) => {
            state.filters = { items: [] };
        },
        updateLocalFilters: (state, action: PayloadAction<{ field: string; query: string }>) => {
            const selectedFilter = state.localFilters.find(
                ({ field }) => field === action.payload.field,
            );
            if (selectedFilter === undefined) {
                state.localFilters.push({
                    field: action.payload.field,
                    query: action.payload.query,
                });
            } else {
                selectedFilter.query = action.payload.query;
            }
        },
        cleanUpLocalFilters: (state) => {
            state.localFilters = [];
        },
    },
});

export const { updateFilter, cleanUpFilters, updateLocalFilters, cleanUpLocalFilters } =
    filterModelSlice.actions;
export const selectFilters = (state: RootState) => state.filterModels.filters;
export const selectLocalFilters = (state: RootState) => state.filterModels.localFilters;

export default filterModelSlice.reducer;
