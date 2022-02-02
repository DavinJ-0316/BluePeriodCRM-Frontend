import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../interfaces/redux';

import {
    getAllCustomers,
    getCustomerByEmail,
    createCustomer,
    updateCustomerByEmail,
    deleteCustomerByEmail,
} from '../../services/customer';
import ICustomer from '../../types/ICustomer';
import asyncStatus from '../../types/asyncStatus';

interface CustomersState {
    customers: ICustomer[];
    status: asyncStatus;
    error: null | string | undefined;
    selectedCustomer: ICustomer;
    isSuccess: boolean;
}
const selectedCustomerInitialState = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    gender: 'MALE',
    address: {
        street: '',
        state: '',
        postcode: '',
        city: '',
    },
    orderAccumulation: 0,
    totalSpent: 0,
};

const initialState: CustomersState = {
    customers: [],
    status: asyncStatus.idle,
    error: null,
    isSuccess: false,
    selectedCustomer: selectedCustomerInitialState as ICustomer,
};

export const fetchAllCustomers = createAsyncThunk('customer/fetchAllCustomers', async () => {
    const data = await getAllCustomers();
    return data as ICustomer[];
});

export const fetchCustomerByEmail = createAsyncThunk(
    'customer/fetchCustomerByEmail',
    async (email: string | undefined, { rejectWithValue }) => {
        try {
            const response = await getCustomerByEmail(email);
            if (response.error) throw new Error(response.error);
            return response as ICustomer;
        } catch (e) {
            return rejectWithValue(e as Error);
        }
    },
);

export const addCustomer = createAsyncThunk(
    'customer/addCustomer',
    async (data: ICustomer, { rejectWithValue }) => {
        try {
            const response = await createCustomer(data);
            if (response.error) throw new Error(response.error);
            return response;
        } catch (e) {
            return rejectWithValue(e as Error);
        }
    },
);

export const updateCustomer = createAsyncThunk(
    'customer/updateCustomer',
    async (data: ICustomer, { rejectWithValue }) => {
        const { email, ...fields } = data;
        try {
            const response = await updateCustomerByEmail(email, fields as ICustomer);
            if (response.error) throw new Error(response.error);
            return response;
        } catch (e) {
            return rejectWithValue(e as Error);
        }
    },
);

export const deleteCustomer = createAsyncThunk(
    'customer/deleteCustomer',
    async (email: string, { rejectWithValue }) => {
        try {
            await deleteCustomerByEmail(email);
            return email;
        } catch (e) {
            return rejectWithValue(e as Error);
        }
    },
);

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        clearState: (state) => {
            state.error = null;
            state.isSuccess = false;
            state.status = asyncStatus.idle;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCustomers.pending, (state: CustomersState) => {
                state.status = asyncStatus.loading;
            })
            .addCase(fetchAllCustomers.fulfilled, (state: CustomersState, action) => {
                state.status = asyncStatus.succeeded;
                state.customers = action.payload;
            })
            .addCase(fetchAllCustomers.rejected, (state: CustomersState, action) => {
                state.status = asyncStatus.failed;
                state.error = action.error.message;
            });

        builder
            .addCase(addCustomer.pending, (state: CustomersState, action) => {
                state.status = asyncStatus.loading;
            })
            .addCase(addCustomer.fulfilled, (state: CustomersState, action) => {
                state.status = asyncStatus.succeeded;
                state.isSuccess = true;
            })
            .addCase(addCustomer.rejected, (state: CustomersState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });

        builder
            .addCase(updateCustomer.pending, (state: CustomersState, action) => {
                state.status = asyncStatus.loading;
            })
            .addCase(updateCustomer.fulfilled, (state: CustomersState, action) => {
                state.status = asyncStatus.succeeded;
                state.isSuccess = true;
                const index = state.customers.findIndex(
                    (customer: ICustomer) => customer.email === action.payload.email,
                );
                state.customers[index] = {
                    ...state.customers[index],
                    ...action.payload,
                };
            })
            .addCase(updateCustomer.rejected, (state: CustomersState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });

        builder
            .addCase(fetchCustomerByEmail.pending, (state: CustomersState, action) => {
                state.status = asyncStatus.loading;
            })
            .addCase(fetchCustomerByEmail.fulfilled, (state: CustomersState, action) => {
                state.status = asyncStatus.succeeded;
                state.selectedCustomer = action.payload;
            })
            .addCase(fetchCustomerByEmail.rejected, (state: CustomersState, action) => {
                state.status = asyncStatus.failed;
                state.error = action.error.message;
            });

        builder
            .addCase(deleteCustomer.pending, (state: CustomersState, action) => {
                state.status = asyncStatus.loading;
            })
            .addCase(deleteCustomer.fulfilled, (state: CustomersState, { payload }) => {
                state.status = asyncStatus.succeeded;
                state.customers = state.customers.filter((customer) => customer.email !== payload);
            })

            .addCase(deleteCustomer.rejected, (state: CustomersState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });
    },
});

export const selectCustomers = (state: RootState) => state.customers.customers;
export const selectCustomer = (state: RootState) => state.customers.selectedCustomer;
export const selectCustomerStatus = (state: RootState) => state.customers.status;
export const customerError = (state: RootState) => state.customers.error;
export const customerSuccess = (state: RootState) => state.customers.isSuccess;
export const { clearState } = customerSlice.actions;

export default customerSlice.reducer;
