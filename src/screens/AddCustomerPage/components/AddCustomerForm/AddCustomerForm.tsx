import { Box, Divider, MenuItem, Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../../../components/InputField';
import ButtonPrimary from '../../../../components/Button/ButtonPrimary';
import useInput from '../../../../hooks/useInput';
import { validateEmail, validateNumber, validatePhone } from '../../../../utils/validator';
import styles from './AddCustomerForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
    addCustomer,
    selectCustomerStatus,
    customerError,
    customerSuccess,
    clearState,
} from '../../../../store/slices/customerSlice';
import { Gender } from '../../../../types/ICustomer';
import SelectField from '../../../../components/SelectField';

const inputEmailIsValid = (value: string) =>
    validateEmail(value.toLowerCase()) && value.trim() !== '';
const valueIsNotEmpty = (value: string) => value.trim() !== '';
const valueIsNumber = (value: string) => value.trim() !== '' && validateNumber(value);

const genderSelect = ['Male', 'Female', 'Other', 'Not to Tell'];

const AddCustomerForm = () => {
    const [formIsValid, setFormIsValid] = useState(true);
    const status = useAppSelector(selectCustomerStatus);
    const errorMsg = useAppSelector(customerError);
    const isSuccess = useAppSelector(customerSuccess);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput(inputEmailIsValid, '');

    const {
        value: genderValue,
        isValid: genderIsValid,
        valueChangeHandler: genderChangeHandler,
        inputBlurHandler: genderBlurHandler,
    } = useInput(valueIsNotEmpty, 'Not to Tell');

    const {
        value: firstNameValue,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
    } = useInput(valueIsNotEmpty, '');

    const {
        value: lastNameValue,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
    } = useInput(valueIsNotEmpty, '');

    const {
        value: addressValue,
        isValid: addressIsValid,
        hasError: addressHasError,
        valueChangeHandler: addressChangeHandler,
        inputBlurHandler: addressBlurHandler,
    } = useInput(valueIsNotEmpty, '');

    const {
        value: cityValue,
        isValid: cityIsValid,
        hasError: cityHasError,
        valueChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurHandler,
    } = useInput(valueIsNotEmpty, '');

    const {
        value: stateValue,
        isValid: stateIsValid,
        hasError: stateHasError,
        valueChangeHandler: stateChangeHandler,
        inputBlurHandler: stateBlurHandler,
    } = useInput(valueIsNotEmpty, '');

    const {
        value: phoneValue,
        isValid: phoneIsValid,
        hasError: phoneHasError,
        valueChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneBlurHandler,
    } = useInput(validatePhone, '');

    const {
        value: postCodeValue,
        isValid: postCodeIsValid,
        valueChangeHandler: postCodeChangeHandler,
        inputBlurHandler: postCodeBlurHandler,
        hasError: postCodeHasError,
    } = useInput(valueIsNumber, '');

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(
                emailIsValid &&
                    firstNameIsValid &&
                    lastNameIsValid &&
                    genderIsValid &&
                    addressIsValid &&
                    cityIsValid &&
                    stateIsValid &&
                    phoneIsValid,
            );
        });

        return () => {
            clearTimeout(identifier);
        };
    }, [
        emailIsValid,
        firstNameIsValid,
        lastNameIsValid,
        addressIsValid,
        postCodeIsValid,
        cityIsValid,
        stateIsValid,
        phoneIsValid,
        genderIsValid,
    ]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        dispatch(
            addCustomer({
                email: emailValue,
                firstName: firstNameValue,
                lastName: lastNameValue,
                phone: phoneValue,
                gender: genderValue as Gender,
                address: {
                    street: addressValue,
                    city: cityValue,
                    state: stateValue,
                    postcode: postCodeValue,
                },
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
            navigate({ pathname: `/customers` });
        }
    }, [dispatch, isSuccess, navigate]);

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <h2 className={styles['addform-subtitle']}>Add customer Form</h2>

            <Divider />

            <Box className={styles['addform-input']}>
                <Box className={styles['addform-input_form']}>
                    <Box className={styles['addform-input_field']}>
                        <InputField
                            required
                            id="firstName"
                            label="First Name"
                            type="text"
                            value={firstNameValue}
                            onChange={firstNameChangeHandler}
                            onBlur={firstNameBlurHandler}
                            error={firstNameHasError}
                        />

                        {firstNameHasError && (
                            <p className={styles['addform-error']}>This field is required.</p>
                        )}
                    </Box>

                    <Box className={styles['addform-input_field']}>
                        <InputField
                            required
                            id="lastName"
                            label="Last Name"
                            type="text"
                            value={lastNameValue}
                            onChange={lastNameChangeHandler}
                            onBlur={lastNameBlurHandler}
                            error={lastNameHasError}
                        />

                        {lastNameHasError && (
                            <p className={styles['addform-error']}>This field is required.</p>
                        )}
                    </Box>
                    <SelectField
                        className={styles['addform-input_select']}
                        id="gender"
                        label="Gender"
                        value={genderValue}
                        onChange={genderChangeHandler}
                        onBlur={genderBlurHandler}
                        required
                    >
                        {genderSelect.map((genders) => (
                            <MenuItem key={genders} value={genders}>
                                {genders}
                            </MenuItem>
                        ))}
                    </SelectField>
                    <Box className={styles['addform-input_field']}>
                        <InputField
                            required
                            id="email"
                            label="Email"
                            type="email"
                            value={emailValue}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            error={emailHasError}
                        />
                        {emailHasError && (
                            <p className={styles['addform-error']}>Please Enter valid Email</p>
                        )}
                    </Box>
                    <Box className={styles['addform-input_field']}>
                        <InputField
                            id="address"
                            label="Address"
                            type="text"
                            value={addressValue}
                            onChange={addressChangeHandler}
                            onBlur={addressBlurHandler}
                            error={addressHasError}
                        />
                        {addressHasError && (
                            <p className={styles['addform-error']}>This field is required.</p>
                        )}
                    </Box>
                    <Box className={styles['addform-input_field']}>
                        <InputField
                            required
                            id="city"
                            label="City"
                            type="text"
                            value={cityValue}
                            onChange={cityChangeHandler}
                            onBlur={cityBlurHandler}
                            error={cityHasError}
                        />
                        {cityHasError && (
                            <p className={styles['addform-error']}>This field is required.</p>
                        )}
                    </Box>
                    <Box className={styles['addform-input_field']}>
                        <InputField
                            required
                            id="state"
                            label="State"
                            type="text"
                            value={stateValue}
                            onChange={stateChangeHandler}
                            onBlur={stateBlurHandler}
                            error={stateHasError}
                        />
                        {stateHasError && (
                            <p className={styles['addform-error']}>This field cannot empty</p>
                        )}
                    </Box>
                    <Box className={styles['addform-input_field']}>
                        <InputField
                            required
                            id="postcode"
                            label="Post Code"
                            type="text"
                            value={postCodeValue}
                            onChange={postCodeChangeHandler}
                            onBlur={postCodeBlurHandler}
                            error={postCodeHasError}
                        />
                        {postCodeHasError && (
                            <p className={styles['addform-error']}>
                                This field cannot empty & only can number
                            </p>
                        )}
                    </Box>
                    <Box className={styles['addform-input_field']}>
                        <InputField
                            required
                            id="phone"
                            label="Mobile Phone Number"
                            type="text"
                            value={phoneValue}
                            onChange={phoneChangeHandler}
                            onBlur={phoneBlurHandler}
                            error={phoneHasError}
                        />
                        {phoneHasError && (
                            <p className={styles['addform-error']}>
                                This field cannot empty & only can number
                            </p>
                        )}
                    </Box>
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
                <Link className={styles['addform-btnsection_link']} to="/customers">
                    <ButtonPrimary className={styles['addform-btnsection_cancel']}>
                        CANCEL
                    </ButtonPrimary>
                </Link>
            </Box>
        </Box>
    );
};

export default AddCustomerForm;
