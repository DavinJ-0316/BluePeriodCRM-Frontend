import React, { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Snackbar, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import SectionLeft from './components/SectionLeft';
import SectionRight from './components/SectionRight';
import OrderDetail from './components/OrderDetail';
import ProductDetail from './components/ProductDetail';
import CustomerDetail from './components/CustomerDetail';
import IOrder, { IOrderUpdate, orderStatus } from '../../types/IOrder.d';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import styles from './OrderEditPage.module.scss';
import {
    fetchOrderById,
    updateOrderStatus,
    selectOrder,
    setIdle,
    selectOrderStatus,
    selectError,
} from '../../store/slices/orderSlice';
import BackPage from '../../components/BackPage/BackPage';
import ButtonPrimary from '../../components/Button';

const OrderEditPage = () => {
    const [openSnack, setOpenSnack] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const queryOrderId = useParams().id;
    const errorMessage = useAppSelector(selectError);
    const selectedOrder: IOrder = useAppSelector(selectOrder);
    const loadingStatus: string = useAppSelector(selectOrderStatus);

    const dispatch = useAppDispatch();
    const { customerInfo, products, dateCreated, status, invoiceId } = selectedOrder;

    const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            setOpenSnack(false);
            return;
        }
        setOpenSnack(false);
    };

    const handleApprove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        dispatch(setIdle());
        const payload: IOrderUpdate = {
            id: queryOrderId || '',
            body: {
                status: orderStatus.COMPLETED,
            },
        };
        setSuccessMsg(`<${queryOrderId}> has successfully APPROVED! `);
        setSubmitted(true);
        dispatch(updateOrderStatus(payload));
    };

    const handleReject = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        dispatch(setIdle());
        const payload: IOrderUpdate = {
            id: queryOrderId || '',
            body: {
                status: orderStatus.REJECTED,
            },
        };
        setSuccessMsg(`<${queryOrderId}> has successfully REJECTED! `);
        setSubmitted(true);
        dispatch(updateOrderStatus(payload));
    };

    useEffect(() => {
        dispatch(fetchOrderById(queryOrderId));
    }, [dispatch, queryOrderId]);

    useEffect(() => {
        if (submitted && ['succeeded', 'failed'].includes(loadingStatus)) {
            setOpenSnack(true);
            setSubmitted(false);
        }
    }, [submitted, loadingStatus]);

    return (
        <div>
            <BackPage to="/orders" title="Orders" className={styles.OrderEditPage_backButton} />
            <div className={styles.OrderEditPage}>
                <Typography className={styles.OrderEditPage_typo}>Orders Details</Typography>
                <div className={styles.OrderEditPage_buttons}>
                    <ButtonPrimary
                        className={styles.OrderEditPage_buttons_left}
                        disabled={status !== 'PENDING'}
                        onClick={handleApprove}
                    >
                        Approve
                    </ButtonPrimary>
                    <ButtonPrimary
                        className={styles.OrderEditPage_buttons_right}
                        disabled={status !== 'PENDING'}
                        onClick={handleReject}
                    >
                        Reject
                    </ButtonPrimary>
                    {loadingStatus === 'loading' && (
                        <CircularProgress className={`${styles.OrderEditPage_loading}`} />
                    )}
                    {loadingStatus === 'succeeded' && (
                        <Snackbar
                            open={openSnack}
                            autoHideDuration={6000}
                            onClose={handleCloseSnack}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        >
                            <Alert
                                onClose={handleCloseSnack}
                                severity="success"
                                sx={{ width: '100%' }}
                            >
                                {successMsg}
                            </Alert>
                        </Snackbar>
                    )}
                    {loadingStatus === 'failed' && (
                        <Snackbar
                            open={openSnack}
                            autoHideDuration={6000}
                            onClose={handleCloseSnack}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        >
                            <Alert
                                onClose={handleCloseSnack}
                                severity="warning"
                                sx={{ width: '100%' }}
                            >
                                {errorMessage || ''}
                            </Alert>
                        </Snackbar>
                    )}
                </div>
            </div>
            <Box className={styles.OrderEditPageBody}>
                <SectionLeft
                    className={styles.OrderEditPageBody_left}
                    orderInfo={
                        <OrderDetail
                            orderId={queryOrderId || ''}
                            dateCreated={dateCreated}
                            status={status}
                            invoiceId={invoiceId}
                        />
                    }
                    customerInfo={<CustomerDetail customer={customerInfo} />}
                />
                <SectionRight
                    className={styles.OrderEditPageBody_right}
                    products={<ProductDetail products={products} />}
                />
            </Box>
        </div>
    );
};

export default OrderEditPage;
