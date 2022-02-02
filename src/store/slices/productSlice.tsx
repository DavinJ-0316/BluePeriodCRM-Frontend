import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../interfaces/redux';
import {
    getAllProducts,
    getProductBySku,
    createProduct,
    updateProductBySku,
    deleteProductBySku,
} from '../../services/product';
import IProduct from '../../types/IProduct';
import IFilter from '../../types/IFilter';
import asyncStatus from '../../types/asyncStatus';

export interface ProductsState {
    products: IProduct[];
    filters: IFilter[];
    status: asyncStatus;
    error: null | string | undefined;
    selectedProduct: IProduct;
    isSuccess: boolean;
}

const selectedProductInitialState = {
    productName: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
};

const initialState: ProductsState = {
    products: [],
    filters: [],
    status: asyncStatus.idle,
    error: null,
    isSuccess: false,
    selectedProduct: selectedProductInitialState as IProduct,
};

export const fetchAllProducts = createAsyncThunk('product/fetchAllProducts', async () => {
    const data = await getAllProducts();
    return data as IProduct[];
});

export const fetchProductBySku = createAsyncThunk(
    'product/fetchProductBySku',
    async (sku: string | undefined, { rejectWithValue }) => {
        try {
            const response = await getProductBySku(sku as string);
            if (response.error) throw new Error(response.error);
            return response as IProduct;
        } catch (e) {
            return rejectWithValue(e as Error);
        }
    },
);

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (body: Partial<IProduct>, { rejectWithValue }) => {
        try {
            const response = await createProduct(body as IProduct);
            if (response.error) throw new Error(response.error);
            return response.fields as IProduct;
        } catch (e) {
            return rejectWithValue(e as Error);
        }
    },
);

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (data: Partial<IProduct>, { rejectWithValue }) => {
        try {
            const { sku, ...fields } = data;
            const response = await updateProductBySku(sku as string, fields as IProduct);
            if (response.error) throw new Error(response.error);
            return response;
        } catch (e) {
            return rejectWithValue(e as Error);
        }
    },
);

export const removeProduct = createAsyncThunk(
    'product/removeProduct',
    async (sku: string, { rejectWithValue }) => {
        try {
            await deleteProductBySku(sku);
            return sku;
        } catch (e) {
            return rejectWithValue(e as Error);
        }
    },
);

export const productSlice = createSlice({
    name: 'product',
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
            .addCase(fetchAllProducts.pending, (state: ProductsState) => {
                state.status = asyncStatus.loading;
            })
            .addCase(fetchAllProducts.fulfilled, (state: ProductsState, action) => {
                state.status = asyncStatus.succeeded;
                state.products = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state: ProductsState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });
        builder
            .addCase(fetchProductBySku.pending, (state: ProductsState) => {
                state.status = asyncStatus.loading;
            })
            .addCase(fetchProductBySku.fulfilled, (state: ProductsState, action) => {
                state.status = asyncStatus.succeeded;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductBySku.rejected, (state: ProductsState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });
        builder
            .addCase(addProduct.pending, (state: ProductsState) => {
                state.status = asyncStatus.loading;
            })
            .addCase(addProduct.fulfilled, (state: ProductsState, action) => {
                state.status = asyncStatus.succeeded;
                state.isSuccess = true;
            })
            .addCase(addProduct.rejected, (state: ProductsState, action) => {
                state.status = asyncStatus.failed;
                if (action.payload) state.error = Object(action.payload).message;
            });
        builder
            .addCase(updateProduct.pending, (state: ProductsState) => {
                state.status = asyncStatus.loading;
            })
            .addCase(updateProduct.fulfilled, (state: ProductsState, action) => {
                state.status = asyncStatus.succeeded;
                state.isSuccess = true;
                const index = state.products.findIndex(
                    (product: IProduct) => product.sku === action.payload.sku,
                );
                state.products[index] = {
                    ...state.products[index],
                    ...action.payload,
                };
            })
            .addCase(updateProduct.rejected, (state: ProductsState, action) => {
                state.status = asyncStatus.failed;
                state.error = action.error.message;
            });
        builder
            .addCase(removeProduct.pending, (state: ProductsState) => {
                state.status = asyncStatus.loading;
            })
            .addCase(removeProduct.fulfilled, (state: ProductsState, { payload }) => {
                state.status = asyncStatus.succeeded;
                state.products = state.products.filter((product) => product.sku !== payload);
            })
            .addCase(removeProduct.rejected, (state: ProductsState, action) => {
                state.status = asyncStatus.failed;
                state.error = action.error.message;
            });
    },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectProduct = (state: RootState) => state.products.selectedProduct;
export const selectProductStatus = (state: RootState) => state.products.status;
export const productError = (state: RootState) => state.products.error;
export const productSuccess = (state: RootState) => state.products.isSuccess;
export const { clearState } = productSlice.actions;

export default productSlice.reducer;
