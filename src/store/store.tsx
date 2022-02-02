import { configureStore } from '@reduxjs/toolkit';
import customerSlice from './slices/customerSlice';
import productSlice from './slices/productSlice';
import userSlice from './slices/userSlice';
import filterSlice from './slices/filterSlice';
import orderSlice from './slices/orderSlice';
import invoiceSlice from './slices/invoiceSlice';

const store = configureStore({
    reducer: {
        filterModels: filterSlice,
        customers: customerSlice,
        products: productSlice,
        users: userSlice,
        orders: orderSlice,
        invoices: invoiceSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: true,
});

export default store;
