import { Button, List } from '@mui/material';
import { Link } from 'react-router-dom';
import { ICustomerInfo } from '../../../../types/IOrder';
import InlineField from '../../../../components/InlineField';
import styles from './CustomerDetail.module.scss';

interface ICustomerDetailProps {
    customer: ICustomerInfo;
}

const CustomerDetail: React.FC<ICustomerDetailProps> = (props: ICustomerDetailProps) => {
    const { customer } = props;
    const { name, email, phone, address } = { ...customer };
    const { street, city, state, postcode } = { ...address };

    const styledEmail = <p className={styles.customerDetail_email}>{email}</p>;
    const styledPhone = phone === undefined ? <p>Not Provided</p> : <p>{phone}</p>;
    const streetTag = street === undefined ? <p>Not Provided</p> : <p>{street}</p>;
    const cityTag = city === undefined ? <p>Not Provided</p> : <p>{city}</p>;
    const stateTag = state === undefined ? <p>Not Provided</p> : <p>{state}</p>;
    const postcodeTag = postcode === undefined ? <p>Not Provided</p> : <p>{postcode}</p>;

    return (
        <List className={styles.customerDetail}>
            <h3 className={styles.customerDetail_title}>Customer Detail</h3>
            <InlineField
                field="Name"
                data={
                    <Link to={`/customers/${email}`}>
                        <Button className={styles.customerDetail_customer}>{name}</Button>
                    </Link>
                }
            />
            <InlineField field="Email" data={styledEmail} />
            <InlineField field="Phone" data={styledPhone} />
            <InlineField field="Street" data={streetTag} />
            <InlineField field="City" data={cityTag} />
            <InlineField field="State/Region" data={stateTag} />
            <InlineField field="PostCode" data={postcodeTag} />
        </List>
    );
};
export default CustomerDetail;
