import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../interfaces/redux';
import { getAllInvoices, getInvoiceById } from '../../services/invoice';
import asyncStatus from '../../types/asyncStatus';
import IInvoice from '../../types/IInvoice';
import { ICustomerInfo, IProduct } from '../../types/IOrder';

interface InvoiceState {
    invoices: IInvoice[];
    status: asyncStatus;
    error: null | string | undefined;
    selectedInvoice: IInvoice;
}

const selectedInvoiceInitialState = {
    invoiceId: '',
    orderId: '',
    customerInfo: {
        name: '',
        email: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            postcode: '',
        },
    } as ICustomerInfo,
    products: [] as IProduct[],
    dateCreated: new Date(),
    dateDue: new Date(),
};

const initialState: InvoiceState = {
    invoices: [],
    status: asyncStatus.idle,
    error: null,
    selectedInvoice: selectedInvoiceInitialState as IInvoice,
};

export const fetchAllInvoices = createAsyncThunk('invoice/fetchAllInvoices', async () => {
    const data = await getAllInvoices();
    return data as IInvoice[];
});

export const fetchInvoiceById = createAsyncThunk(
    'invoice/fetchInvoiceById',
    async (id: string | undefined) => {
        const response = await getInvoiceById(id);
        return response as IInvoice;
    },
);

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllInvoices.pending, (state: InvoiceState) => {
                state.status = asyncStatus.loading;
            })
            .addCase(fetchAllInvoices.fulfilled, (state: InvoiceState, action) => {
                state.status = asyncStatus.succeeded;
                state.invoices = action.payload;
            })
            .addCase(fetchAllInvoices.rejected, (state: InvoiceState, action) => {
                state.status = asyncStatus.failed;
                state.error = action.error.message;
            })

            .addCase(fetchInvoiceById.pending, (state: InvoiceState) => {
                state.status = asyncStatus.loading;
            })
            .addCase(fetchInvoiceById.fulfilled, (state: InvoiceState, action) => {
                state.status = asyncStatus.succeeded;
                state.selectedInvoice = action.payload;
            })
            .addCase(fetchInvoiceById.rejected, (state: InvoiceState, action) => {
                state.status = asyncStatus.failed;
                state.error = action.error.message;
            });
    },
});

export const selectedAllInvoices = (state: RootState) => state.invoices.invoices;
export const selectInvoice = (state: RootState) => state.invoices.selectedInvoice;
export const selectInvoiceStatus = (state: RootState) => state.orders.status;

export default invoiceSlice.reducer;
