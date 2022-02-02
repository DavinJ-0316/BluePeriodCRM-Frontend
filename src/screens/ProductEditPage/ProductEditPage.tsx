import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
    fetchProductBySku,
    selectProduct,
    selectProductStatus,
} from '../../store/slices/productSlice';

import IProduct from '../../types/IProduct';
import BackToProduct from './components/BackToProduct';
import BasicDetails from './components/BasicDetails';
import LoadingSpinner from '../../components/LoadingSpinner';

const ProductEditPage = () => {
    const { sku } = useParams();
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectProductStatus);
    const product: IProduct = useAppSelector(selectProduct);

    useEffect(() => {
        dispatch(fetchProductBySku(sku));
    }, [dispatch, sku]);

    const details = { ...product };

    return (
        <>
            {status === 'loading' && <LoadingSpinner />}
            {status === 'succeeded' && (
                <>
                    <BackToProduct />
                    <BasicDetails details={details} />
                </>
            )}
        </>
    );
};

export default ProductEditPage;
