import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import ProductDetail from './components/ProductDetail';
import ProductDetailHeading from './components/ProductDetailHeading';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
    fetchProductBySku,
    selectProduct,
    selectProductStatus,
} from '../../store/slices/productSlice';
import IProduct from '../../types/IProduct';
import LoadingSpinner from '../../components/LoadingSpinner';

const ProductDetailPage = () => {
    const status = useAppSelector(selectProductStatus);
    const dispatch = useAppDispatch();
    const { sku } = useParams();

    useEffect(() => {
        dispatch(fetchProductBySku(sku));
    }, [dispatch, sku]);

    const product: IProduct = useAppSelector(selectProduct);

    const name = `${product.productName}`;
    return (
        <Container>
            {status === 'loading' && <LoadingSpinner />}
            {status === 'succeeded' && (
                <>
                    <ProductDetailHeading name={name} sku={product.sku} />
                    <ProductDetail details={product} />
                </>
            )}
        </Container>
    );
};

export default ProductDetailPage;
