import { Box, Button, Divider, MenuItem, TextField, Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../../../components/InputField';
import ButtonPrimary from '../../../../components/Button/ButtonPrimary';
import useInput from '../../../../hooks/useInput';
import { validateNumber } from '../../../../utils/validator';
import styles from './AddProductForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
    addProduct,
    productError,
    productSuccess,
    clearState,
    selectProductStatus,
} from '../../../../store/slices/productSlice';
import SelectField from '../../../../components/SelectField';

const isValueNotEmpty = (value: string) => value.trim() !== '';
const isValueNumber = (value: string) => value.trim() !== '' && validateNumber(value);

const categorySelect: string[] = ['Computers', 'Phones', 'Accesories'];

const AddProductForm = () => {
    const status = useAppSelector(selectProductStatus);
    const errorMsg = useAppSelector(productError);
    const isSuccess = useAppSelector(productSuccess);
    const [isFormValid, isSetFormValid] = useState(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        value: productNameValue,
        isValid: isProductNameValid,
        hasError: productNameHasError,
        valueChangeHandler: productNameChangeHandler,
        inputBlurHandler: productNameBlurHandler,
    } = useInput(isValueNotEmpty, '');

    const { value: descriptionValue, valueChangeHandler: descriptionChangeHandler } = useInput(
        isValueNotEmpty,
        '',
    );

    const {
        value: categoryValue,
        isValid: isCategoryValid,
        valueChangeHandler: categoryChangeHandler,
        inputBlurHandler: categoryBlurHandler,
    } = useInput(isValueNotEmpty, '');

    const {
        value: priceValue,
        isValid: isPriceValid,
        valueChangeHandler: priceChangeHandler,
        inputBlurHandler: priceBlurHandler,
        hasError: priceHasError,
    } = useInput(isValueNumber, '');

    const {
        value: quantityValue,
        isValid: isQuantityValid,
        valueChangeHandler: quantityChangeHandler,
        inputBlurHandler: quantityBlurHandler,
        hasError: quantityHasError,
    } = useInput(isValueNumber, '');

    useEffect(() => {
        const identifier = setTimeout(() => {
            isSetFormValid(
                isProductNameValid && isCategoryValid && isPriceValid && isQuantityValid,
            );
        });

        return () => {
            clearTimeout(identifier);
        };
    }, [isProductNameValid, isCategoryValid, isPriceValid, isQuantityValid]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isFormValid) {
            return;
        }

        dispatch(
            addProduct({
                productName: productNameValue,
                category: categoryValue,
                price: priceValue,
                quantity: quantityValue,
                description: descriptionValue,
            }),
        );
    };

    useEffect(
        () => () => {
            dispatch(clearState());
        },
        [dispatch],
    );

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
            navigate({ pathname: `/products` });
        }
    }, [dispatch, isSuccess, navigate]);

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <div className={styles['addform-header']}>
                <h2 className={styles['addform-header-subtitle']}>Add Product Form</h2>
            </div>

            <Divider />

            <Box className={styles['addform-input']}>
                <Box className={styles['addform-input_form']}>
                    <Box className={styles['addform-input_field']}>
                        <InputField
                            required
                            id="productName"
                            label="Product Name"
                            type="text"
                            value={productNameValue}
                            onChange={productNameChangeHandler}
                            onBlur={productNameBlurHandler}
                            error={productNameHasError}
                        />

                        {productNameHasError && (
                            <p className={styles['addform-error']}>This field is required.</p>
                        )}
                    </Box>
                    <SelectField
                        className={styles['addform-input_select']}
                        id="category"
                        label="Select Category"
                        value={categoryValue}
                        onChange={categoryChangeHandler}
                        onBlur={categoryBlurHandler}
                        required
                    >
                        {categorySelect.map((categorys) => (
                            <MenuItem key={categorys} value={categorys}>
                                {categorys}
                            </MenuItem>
                        ))}
                    </SelectField>
                    <Box className={styles['addform-input_field']}>
                        <InputField
                            required
                            id="price"
                            label="Price"
                            type="number"
                            value={priceValue}
                            onChange={priceChangeHandler}
                            onBlur={priceBlurHandler}
                            error={priceHasError}
                        />
                        {priceHasError && (
                            <p className={styles['addform-error']}>
                                This field cannot empty & only can number
                            </p>
                        )}
                    </Box>
                    <Box className={styles['addform-input_field']}>
                        <InputField
                            required
                            id="quantity"
                            label="Quantity"
                            type="number"
                            value={quantityValue}
                            onChange={quantityChangeHandler}
                            onBlur={quantityBlurHandler}
                            error={quantityHasError}
                        />
                        {quantityHasError && (
                            <p className={styles['addform-error']}>
                                This field cannot empty & only can number
                            </p>
                        )}
                    </Box>
                    <Box className={styles['addform-input_description']}>
                        <TextField
                            fullWidth
                            id="description"
                            label="Description"
                            value={descriptionValue}
                            onChange={descriptionChangeHandler}
                            multiline
                            rows={5}
                        />
                    </Box>

                    <Button
                        className={styles['addform-btnsection_upload']}
                        variant="contained"
                        component="label"
                    >
                        Upload Image
                        <input
                            className={styles['addform-btnsection_upload_input']}
                            accept="image/*"
                            id="image"
                            multiple
                            type="file"
                        />
                    </Button>
                </Box>
            </Box>
            {status === 'failed' && errorMsg !== null ? (
                <Alert severity="error">
                    <strong>{errorMsg}</strong> — check it out!
                </Alert>
            ) : (
                ''
            )}
            <Divider />
            <Box className={styles['addform-btnsection']}>
                <ButtonPrimary className={styles['addform-btnsection_add']} type="submit">
                    Add
                </ButtonPrimary>
                <Link className={styles['addform-btnsection_link']} to="/products">
                    <ButtonPrimary className={styles['addform-btnsection_cancel']}>
                        CANCEL
                    </ButtonPrimary>
                </Link>
            </Box>
        </Box>
    );
};

export default AddProductForm;
