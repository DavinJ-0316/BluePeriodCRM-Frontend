import { Box, Divider, MenuItem, Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../../components/InputField';
import ButtonPrimary from '../../../../components/Button/ButtonPrimary';
import useInput from '../../../../hooks/useInput';
import { validateEmail, validateNumber, validatePhone } from '../../../../utils/validator';
import styles from './EditCustomerForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
    updateCustomer,
    deleteCustomer,
    customerError,
    customerSuccess,
    clearState,
    selectCustomerStatus,
} from '../../../../store/slices/customerSlice';
import DeleteConfirmation from '../../../../components/DeleteConfirmationModal';
import ICustomer, { Gender } from '../../../../types/ICustomer';
import SelectField from '../../../../components/SelectField';

export interface DetailsProps {
    details: ICustomer;
}

const inputEmailIsValid = (value: string) =>
    value.trim() !== '' && validateEmail(value.toLowerCase());
const valueIsNumber = (value: string) => validateNumber(value);
const valueIsNotEmpty = (value: string) => value.trim() !== '';

const genderSelect = ['Male', 'Female', 'Other', 'Not to Tell', ''];

const EditCustomerForm: React.FC<DetailsProps> = (props: DetailsProps) => {
    const [openPopup, setOpenPopup] = useState(false);
    const showModal = () => setOpenPopup(true);
    const { details } = props;
    const [formIsValid, setFormIsValid] = useState(true);
    const status = useAppSelector(selectCustomerStatus);
    const errorMsg = useAppSelector(customerError);
    const isSuccess = useAppSelector(customerSuccess);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { value: emailValue } = useInput(inputEmailIsValid, details.email);

    const {
        value: firstNameValue,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
    } = useInput(valueIsNotEmpty, details.firstName || '');
    const {
        value: lastNameValue,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
    } = useInput(valueIsNotEmpty, details.lastName || '');

    const {
        value: genderValue,
        isValid: genderIsValid,
        valueChangeHandler: genderChangeHandler,
        inputBlurHandler: genderBlurHandler,
    } = useInput(valueIsNotEmpty, details.gender || '');

    const {
        value: addressValue,
        isValid: addressIsValid,
        hasError: addressHasError,
        valueChangeHandler: addressChangeHandler,
        inputBlurHandler: addressBlurHandler,
    } = useInput(valueIsNotEmpty, details.address.street || '');

    const {
        value: postCodeValue,
        isValid: postCodeIsValid,
        hasError: postCodeHasError,
        valueChangeHandler: postCodeChangeHandler,
        inputBlurHandler: postCodeBlurHandler,
    } = useInput(valueIsNumber, details.address.postcode);

    const {
        value: cityValue,
        isValid: cityIsValid,
        hasError: cityHasError,
        valueChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurHandler,
    } = useInput(valueIsNotEmpty, details.address.city || '');

    const {
        value: stateValue,
        isValid: stateIsValid,
        hasError: stateHasError,
        valueChangeHandler: stateChangeHandler,
        inputBlurHandler: stateBlurHandler,
    } = useInput(valueIsNotEmpty, details.address.state || '');

    const {
        value: phoneValue,
        isValid: phoneIsValid,
        hasError: phoneHasError,
        valueChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneBlurHandler,
    } = useInput(validatePhone, details.phone);

    useEffect(
        () => () => {
            dispatch(clearState());
        },
        [dispatch],
    );

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(
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
        firstNameIsValid,
        lastNameIsValid,
        addressIsValid,
        postCodeIsValid,
        cityIsValid,
        stateIsValid,
        phoneIsValid,
        genderIsValid,
    ]);
    const navigateHandler = () => navigate(-1);

    const deleteHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        dispatch(deleteCustomer(details.email));
        navigate({ pathname: '/customers' });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        dispatch(
            updateCustomer({
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

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
            navigate({ pathname: `/customers/${emailValue}` });
        }
    }, [dispatch, emailValue, isSuccess, navigate]);

    return (
        <Box className={styles.editform} component="form" onSubmit={handleSubmit}>
            <h2 className={styles['editform-subtitle']}>Edit customer</h2>
            <Divider />
            <Box className={styles['editform-input']}>
                <Box className={styles['editform-input_form']}>
                    <Box className={styles['editform-input_field']}>
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
                            <p className={styles['editform-error']}>This field is required.</p>
                        )}
                    </Box>
                    <Box className={styles['editform-input_field']}>
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
                            <p className={styles['editform-error']}>This field is required.</p>
                        )}
                    </Box>
                    <SelectField
                        className={styles['editform-input_select']}
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
                    <InputField
                        className={styles['editform-input_field']}
                        disabled
                        id="email"
                        label="Email"
                        type="email"
                        value={emailValue}
                    />
                    <Box className={styles['editform-input_field']}>
                        <InputField
                            required
                            id="address"
                            label="Address"
                            type="text"
                            value={addressValue}
                            onChange={addressChangeHandler}
                            onBlur={addressBlurHandler}
                            error={addressHasError}
                        />
                        {addressHasError && (
                            <p className={styles['editform-error']}>This field is required.</p>
                        )}
                    </Box>
                    <Box className={styles['editform-input_field']}>
                        <InputField
                            id="postcode"
                            label="Post Code"
                            type="text"
                            value={postCodeValue}
                            onChange={postCodeChangeHandler}
                            onBlur={postCodeBlurHandler}
                            error={postCodeHasError}
                        />
                        {postCodeHasError && (
                            <p className={styles['editform-error']}>
                                This field cannot empty & only can number
                            </p>
                        )}
                    </Box>
                    <Box className={styles['editform-input_field']}>
                        <InputField
                            required
                            id="city"
                            label="City/Suburb"
                            type="text"
                            value={cityValue}
                            onChange={cityChangeHandler}
                            onBlur={cityBlurHandler}
                            error={cityHasError}
                        />
                        {cityHasError && (
                            <p className={styles['editform-error']}>This field is required.</p>
                        )}
                    </Box>
                    <Box className={styles['editform-input_field']}>
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
                            <p className={styles['editform-error']}>This field cannot empty</p>
                        )}
                    </Box>
                    <Box className={styles['editform-input_field']}>
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
                            <p className={styles['editform-error']}>
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
            <Box className={styles['editform-btnsection']}>
                <ButtonPrimary className={styles['editform-btnsection_update']} type="submit">
                    Update
                </ButtonPrimary>
                <ButtonPrimary
                    className={styles['editform-btnsection_cancel']}
                    onClick={navigateHandler}
                >
                    CANCEL
                </ButtonPrimary>
                <ButtonPrimary className={styles['editform-btnsection_delete']} onClick={showModal}>
                    Delete Account
                </ButtonPrimary>
                <DeleteConfirmation
                    name={`${firstNameValue} ${lastNameValue}`}
                    onClick={deleteHandler}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                />
            </Box>
        </Box>
    );
};
export default EditCustomerForm;
