import { List } from '@mui/material';
import React, { ReactNode } from 'react';
import InlineField from '../../../../components/InlineField';
import StatusBar, { TStatus } from '../../../../components/StatusBar/StatusBar';
import styles from './OrderDetail.module.scss';
import { DateToDDMMMYYYYHHMM } from '../../../../utils/dataProcessor';

interface IOrderDetailProps {
    orderId: string;
    dateCreated: Date;
    status: TStatus;
    invoiceId?: string;
}

const OrderDetail: React.FC<IOrderDetailProps> = (props: IOrderDetailProps) => {
    const { orderId, dateCreated, status, invoiceId } = props;
    const formatedDate: ReactNode = <p>{DateToDDMMMYYYYHHMM(dateCreated)}</p>;
    const formatedInovice: ReactNode = invoiceId ? (
        <strong className={styles.orderDetail_invoice}>{invoiceId}</strong>
    ) : (
        <strong className={styles.orderDetail_invoice_unavailable}>Unavailable</strong>
    );
    return (
        <List className={styles.orderDetail}>
            <h3 className={styles.orderDetail_tilte}>Order Info</h3>
            <InlineField field="ID" data={<p>{orderId}</p>} />
            <InlineField field="Date Created" data={formatedDate} />
            <InlineField field="Invoice" data={formatedInovice} />
            <InlineField
                field="Status"
                data={<StatusBar status={status} />}
                className={styles.noOverlay}
            />
        </List>
    );
};

OrderDetail.defaultProps = {
    invoiceId: '',
};

export default OrderDetail;
