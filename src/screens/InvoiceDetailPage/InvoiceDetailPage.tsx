import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Divider } from '@mui/material';
import InvoiceDetailHeading from './components/InvoiceHeading/InvoiceHeading';
import BackPage from '../../components/BackPage/BackPage';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchInvoiceById, selectInvoice } from '../../store/slices/invoiceSlice';
import IInvoice from '../../types/IInvoice';
import InvoicePreview from './components/InvoicePreview';
import styles from './InvoiceDetailPage.module.scss';

const InvocieDetailPage = () => {
    const queryInvoiceId = useParams().id;
    const dispatch = useAppDispatch();
    const invoice: IInvoice = useAppSelector(selectInvoice);

    useEffect(() => {
        dispatch(fetchInvoiceById(queryInvoiceId));
    }, [dispatch, queryInvoiceId]);

    return (
        <div className={styles.invoiceDetail}>
            <BackPage to="/invoices" title="Invoice" />
            <InvoiceDetailHeading
                invoice={invoice}
                name={invoice.customerInfo.name || ''}
                email={invoice.customerInfo.email}
            />
            <Divider className={styles.invoiceDetail_divider} />
            <InvoicePreview invoice={invoice} />
        </div>
    );
};

export default InvocieDetailPage;
