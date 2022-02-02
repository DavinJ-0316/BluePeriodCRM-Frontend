import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Divider, TextField } from '@mui/material';
import ButtonPrimary from '../../../../components/Button';
import styles from '../../ProductDetailPage.module.scss';
import IProduct from '../../../../types/IProduct';
import { useAppDispatch } from '../../../../hooks/redux';
import { removeProduct } from '../../../../store/slices/productSlice';
import DeleteConfirmation from '../../../../components/DeleteConfirmationModal';

interface IDetail {
    Name: string;
    Category: string;
    Description: string;
    Quantity: string;
    Price: string;
}
export interface DetailsProps {
    details: IProduct;
}

const ProductDetail: React.FC<DetailsProps> = (props: DetailsProps) => {
    const [openPopup, setOpenPopup] = useState(false);
    const showModal = () => setOpenPopup(true);
    const { details } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const detail = {
        Name: details.productName,
        Category: details.category,
        Description: details.description,
        Quantity: details.quantity,
        Price: `$ ${details.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    };

    const deleteHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        dispatch(removeProduct(details.sku));
        navigate({ pathname: '/products' });
    };

    return (
        <>
            <Box className={styles['productdetail-details']}>
                <span className={styles['productdetail-details-title']}>Basic Details</span>
                <Divider />
                <List>
                    {Object.keys(detail).map((key, i) => (
                        <div key={key[i]}>
                            <ListItem className={styles['productdetail-details-itemtext']}>
                                <ListItemText
                                    primary={key}
                                    secondary={
                                        key[i] === 'Description' ? (
                                            <TextField
                                                fullWidth
                                                variant="standard"
                                                color="secondary"
                                                InputProps={{
                                                    className:
                                                        styles[
                                                            'productdetail-details-itemtext-description'
                                                        ],
                                                    disableUnderline: true,
                                                }}
                                                multiline
                                                defaultValue={detail[key as keyof IDetail]}
                                            />
                                        ) : (
                                            detail[key as keyof IDetail]
                                        )
                                    }
                                />
                            </ListItem>
                            {key !== 'Price' && <Divider />}
                        </div>
                    ))}
                </List>
            </Box>
            <Box className={styles['productdetail-details']}>
                <span className={styles['productdetail-details-title']}>Data Management</span>
                <Divider />
                <Box className={styles['productdetail-details-delete']}>
                    <ButtonPrimary
                        className={styles['productdetail-details-delete-btn']}
                        onClick={showModal}
                    >
                        Delete Product
                    </ButtonPrimary>
                    <span className={styles['productdetail-details-delete-text']}>
                        Remove this product, please be aware that what has been deleted can never
                        brought back
                    </span>
                    <DeleteConfirmation
                        name={detail.Name}
                        onClick={deleteHandler}
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    />
                </Box>
            </Box>
        </>
    );
};

export default ProductDetail;
