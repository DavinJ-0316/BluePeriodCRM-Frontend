import { Alert, Box, Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../../components/InputField';
import ButtonPrimary from '../../../../components/Button/ButtonPrimary';
import useInput from '../../../../hooks/useInput';
import { validatePhone } from '../../../../utils/validator';
import styles from './MyProfileEditForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

import { IUser } from '../../../../types/IUser';
import { updateMe, authUserStatus } from '../../../../store/slices/userSlice';

export interface DetailsProps {
    user: IUser;
}

const valueIsNotEmpty = (value: string) => value.trim() !== '';

const MyProfileEditForm: React.FC<DetailsProps> = (props: DetailsProps) => {
    const { user } = props;
    const [formIsValid, setFormIsValid] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const status = useAppSelector(authUserStatus);

    const userEmail = user.email;

    const {
        value: firstNameValue,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
    } = useInput(valueIsNotEmpty, user.firstName || '');
    const {
        value: lastNameValue,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
    } = useInput(valueIsNotEmpty, user.lastName || '');

    const {
        value: phoneValue,
        isValid: phoneIsValid,
        hasError: phoneHasError,
        valueChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneBlurHandler,
    } = useInput(validatePhone, user.phone || '');

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(firstNameIsValid && lastNameIsValid && phoneIsValid);
        });

        return () => {
            clearTimeout(identifier);
        };
    }, [firstNameIsValid, lastNameIsValid, phoneIsValid]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        dispatch(
            updateMe({
                email: userEmail,
                firstName: firstNameValue,
                lastName: lastNameValue,
                phone: phoneValue,
            }),
        );
        setFormSubmitted(true);
        navigate({ pathname: `/users/${userEmail}/profile` });
    };

    return (
        <Box className={styles.editform} component="form" onSubmit={handleSubmit}>
            <span className={styles['editform-subtitle']}>Edit User Information</span>
            <Divider />
            <Box className={styles['editform-input']}>
                <Box className={styles['editform-input_form']}>
                    <InputField
                        className={styles['editform-input_field']}
                        disabled
                        id="email"
                        label="Email"
                        type="email"
                        value={userEmail}
                    />
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
            <Divider />
            {formSubmitted && status === 'succeeded' ? (
                <Alert severity="success">
                    <strong>User Information update successfully</strong>
                </Alert>
            ) : (
                ''
            )}
            <Box className={styles['editform-btnsection']}>
                <ButtonPrimary className={styles['editform-btnsection_update']} type="submit">
                    Update
                </ButtonPrimary>
            </Box>
        </Box>
    );
};
export default MyProfileEditForm;
