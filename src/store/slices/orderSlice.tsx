import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../interfaces/redux';
import { getAllOrders, getOrderById, updateOrderStatusById } from '../../services/order';
import asyncStatus from '../../types/asyncStatus';
import IOrder, { ICustomerInfo, IOrderUpdate, IProduct } from '../../types/IOrder';

interface OrderState {
    orders: IOrder[];
    status: asyncStatus;
    error: null | string | undefined;
    selectedOrder: IOrder;
}

const selectedOrderInitialState = {
    orderId: '',
    customerInfo: {} as ICustomerInfo,
    products: [] as IProduct[],
    dateCreated: new Date(),
    status: '',
    invoiceId: '',
};

const initialState: OrderState = {
    orders: [],
    status: asyncStatus.idle,
    error: null,
    selectedOrder: selectedOrderInitialState as IOrder,
};

export const fetchAllOrders = createAsyncThunk('order/fetchAllOrders', async () => {
    const data = await getAllOrders();
    return data as IOrder[];
});

export const fetchOrderById = createAsyncThunk(
    'order/fetchOrderById',
    async (id: string | undefined) => {
        const response = await getOrderById(id);
        return response as IOrder;
    },
);
export const updateOrderStatus = createAsyncThunk(
    'order/updateOrderStatus',
    async (data: IOrderUpdate, { rejectWithValue }) => {
        const { id, body } = data;
        try {
            const response = await updateOrderStatusById(id, body);
            if (response.error) {
                throw new Error(response.error);
            }
            return response as IOrder;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setIdle: (state) => {
            state.status = asyncStatus.idle;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state: OrderState) => {
                state.status = asyncStatus.loading;
            })
            .addCase(fetchAllOrders.fulfilled, (state: OrderState, action) => {
                state.status = asyncStatus.succeeded;
                state.orders = action.payload;
            })
            .addCase(fetchAllOrders.rejected, (state: OrderState, action) => {
                state.status = asyncStatus.failed;
                state.error = action.error.message;
            })

            .addCase(fetchOrderById.pending, (state: OrderState) => {
                state.status = asyncStatus.loading;
            })
            .addCase(fetchOrderById.fulfilled, (state: OrderState, action) => {
                state.status = asyncStatus.succeeded;
                state.selectedOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state: OrderState, action) => {
                state.status = asyncStatus.failed;
                state.error = action.error.message;
            })

            .addCase(updateOrderStatus.pending, (state: OrderState) => {
                state.status = asyncStatus.loading;
            })
            .addCase(updateOrderStatus.fulfilled, (state: OrderState, action) => {
                state.status = asyncStatus.succeeded;
                state.selectedOrder = action.payload;
            })
            .addCase(updateOrderStatus.rejected, (state: OrderState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) {
                    state.error = Object(action.payload).message as string;
                }
            });
    },
});

export const { setIdle } = orderSlice.actions;

export const selectedAllOrders = (state: RootState) => state.orders.orders;
export const selectOrder = (state: RootState) => state.orders.selectedOrder;
export const selectOrderStatus = (state: RootState) => state.orders.status;
export const selectError = (state: RootState) => state.orders.error;

export default orderSlice.reducer;
