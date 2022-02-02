import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import ButtonPrimary from '../../../../components/Button';
import styles from '../../CustomerDetailPage.module.scss';
import ICustomer from '../../../../types/ICustomer';
import { useAppDispatch } from '../../../../hooks/redux';
import { deleteCustomer } from '../../../../store/slices/customerSlice';
import DeleteConfirmation from '../../../../components/DeleteConfirmationModal';

interface IDetail {
    Email: string;
    Phone: string;
    Name: string;
    Gender: string;
    Address: string;
    Spent: number;
}
export interface DetailsProps {
    details: ICustomer;
}

const CustomerDetail: React.FC<DetailsProps> = (props: DetailsProps) => {
    const [openPopup, setOpenPopup] = useState(false);
    const showModal = () => setOpenPopup(true);

    const { details } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const detail = {
        Email: details.email,
        Name: `${details.firstName} ${details.lastName}`,
        Phone: details.phone,
        Gender: details.gender,
        Address: `${details.address.street}, ${details.address.city}, ${details.address.state} ${details.address.postcode}`,
        Spent: details.spending,
    };

    const deleteHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        dispatch(deleteCustomer(details.email));
        navigate({ pathname: '/customers' });
    };

    return (
        <>
            <Box className={styles['customerdetail-details']}>
                <span className={styles['customerdetail-details-title']}>Basic Details</span>
                <List>
                    {Object.keys(detail).map((key) => (
                        <div key={key}>
                            <Divider />
                            <ListItem className={styles['customerdetail-details-itemtext']}>
                                <ListItemText
                                    primary={key}
                                    secondary={detail[key as keyof IDetail]}
                                />
                            </ListItem>
                        </div>
                    ))}
                </List>
            </Box>
            <Box className={styles['customerdetail-details']}>
                <span className={styles['customerdetail-details-title']}>Data Management</span>
                <Divider />
                <Box className={styles['customerdetail-details-delete']}>
                    <ButtonPrimary
                        className={styles['customerdetail-details-delete-btn']}
                        onClick={showModal}
                    >
                        Delete Account
                    </ButtonPrimary>
                    <DeleteConfirmation
                        name={detail.Name}
                        onClick={deleteHandler}
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    />
                    <span>
                        Remove this customer&#32;s chart if he requested that, if not please be
                        aware that what has been deleted can never brought back
                    </span>
                </Box>
            </Box>
        </>
    );
};

export default CustomerDetail;
