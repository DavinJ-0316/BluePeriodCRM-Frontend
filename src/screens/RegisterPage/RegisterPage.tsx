import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, FormControlLabel, Checkbox, Alert } from '@mui/material';
import styles from './RegisterPage.module.scss';
import ButtonPrimary from '../../components/Button';
import InputField from '../../components/InputField';
import PasswordInputField from '../../components/PasswordInputField';
import useInput from '../../hooks/useInput';
import { validateEmail, validatePassword, validatePhone } from '../../utils/validator';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import MainIcon from '../../assets/images/logos/logoColorNoBG.png';

import {
    register,
    authError,
    authUserStatus,
    clearState,
    authUserSuccess,
    regMessage,
} from '../../store/slices/userSlice';

const inputEmailIsValid = (value: string) => validateEmail(value.toLowerCase());
const inputPasswordIsValid = (value: string) => validatePassword(value) && value.trim() !== '';
const valueIsNotEmpty = (value: string) => value.trim() !== '';

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const errorMsg = useAppSelector(authError);
    const status = useAppSelector(authUserStatus);
    const isSuccess = useAppSelector(authUserSuccess);
    const message = useAppSelector(regMessage);
    const [isChecked, setIsChecked] = useState(false);
    const [formIsValid, setFormIsValid] = useState(true);
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const {
        value: emailValue,
        isValid: isEmailValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput(inputEmailIsValid, '');

    const {
        value: firstNameValue,
        isValid: isFirstNameValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
    } = useInput(valueIsNotEmpty, '');

    const {
        value: lastNameValue,
        isValid: isLastNameValid,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
    } = useInput(valueIsNotEmpty, '');

    const {
        value: phoneValue,
        isValid: isPhoneValid,
        hasError: phoneHasError,
        valueChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneBlurHandler,
    } = useInput(validatePhone, '');

    const {
        value: passwordValue,
        isValid: isPasswordValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetpassword,
    } = useInput(inputPasswordIsValid, '');

    const {
        value: comfirmPasswordValue,
        isValid: isComfirmPasswordValid,
        hasError: comfirmPasswordHasError,
        valueChangeHandler: comfirmPasswordChangeHandler,
        inputBlurHandler: comfirmPasswordBlurHandler,
        reset: resetComfirmPassword,
    } = useInput(inputPasswordIsValid, '');

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(
                isEmailValid &&
                    isFirstNameValid &&
                    isLastNameValid &&
                    isPasswordValid &&
                    isComfirmPasswordValid &&
                    isPhoneValid &&
                    isChecked,
            );
        });

        return () => {
            clearTimeout(identifier);
        };
    }, [
        isEmailValid,
        isFirstNameValid,
        isLastNameValid,
        isPasswordValid,
        isComfirmPasswordValid,
        isPhoneValid,
        isChecked,
    ]);

    const onBlurHandler = () => {
        setIsTouched(true);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formIsValid === false) {
            setIsTouched(true);
            return;
        }

        const data = {
            email: emailValue,
            firstName: firstNameValue,
            lastName: lastNameValue,
            phone: phoneValue,
            password: passwordValue,
            confirmedPassword: comfirmPasswordValue,
        };

        dispatch(register(data));

        resetpassword();
        resetComfirmPassword();
    };

    useEffect(
        () => () => {
            dispatch(clearState());
        },
        [dispatch],
    );

    useEffect(() => {
        if (status === 'succeeded') {
            setTimeout(() => {
                navigate({ pathname: `/login` });
            }, 5000);
        }
    }, [dispatch, navigate, status]);

    return (
        <div className={styles.registration}>
            <img src={MainIcon} alt="mainicon" className={styles['registration-logo']} />
            <Box
                className={styles['registration-box']}
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <Typography className={styles['registration-title']}>Create an account</Typography>
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
                    <p className={styles['registration-error']}>Please Enter valid Email</p>
                )}
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
                    <p className={styles['registration-error']}>This field cannot empty</p>
                )}
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
                    <p className={styles['registration-error']}>This field cannot empty</p>
                )}
                <Box className={styles['addform-input_field']}>
                    <InputField
                        required
                        id="phone"
                        label="Phone Number"
                        type="text"
                        value={phoneValue}
                        onChange={phoneChangeHandler}
                        onBlur={phoneBlurHandler}
                        error={phoneHasError}
                    />
                    {phoneHasError && (
                        <p className={styles['registration-error']}>
                            This field cannot empty & only can number
                        </p>
                    )}
                </Box>
                <PasswordInputField
                    required
                    id="password"
                    label="Password"
                    type="password"
                    value={passwordValue}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                    error={passwordHasError}
                />
                {passwordHasError && (
                    <p className={styles['registration-error']}>
                        Please Enter valid password <br />
                        (Include letter, number and !, @, #, $, %, ^, _, &, * )
                    </p>
                )}
                <PasswordInputField
                    required
                    id="confirmedPassword"
                    label="Confirm Password"
                    type="password"
                    value={comfirmPasswordValue}
                    onChange={comfirmPasswordChangeHandler}
                    onBlur={comfirmPasswordBlurHandler}
                    error={comfirmPasswordValue !== passwordValue || comfirmPasswordHasError}
                />
                {(comfirmPasswordHasError || comfirmPasswordValue !== passwordValue) && (
                    <p className={styles['registration-error']}>Password must be same</p>
                )}

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isChecked}
                            onChange={(event) => setIsChecked(event.target.checked)}
                            name="checked"
                            color="primary"
                            onBlur={onBlurHandler}
                        />
                    }
                    label={
                        <Typography variant="subtitle1">
                            Agree with &nbsp;
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to="#"
                                className={styles['registration-link']}
                            >
                                Terms & Condition.
                            </Typography>
                        </Typography>
                    }
                />
                {isChecked === false && isTouched === true ? (
                    <p className={styles['registration-error']}>Please click the Agreement</p>
                ) : (
                    ''
                )}
                {status === 'failed' && errorMsg !== null ? (
                    <Alert severity="error">
                        <strong>{errorMsg}</strong>
                    </Alert>
                ) : (
                    ''
                )}
                {message !== '' && errorMsg === null && isSuccess === true ? (
                    <Alert severity="success">
                        <strong>{message}</strong>
                    </Alert>
                ) : (
                    ''
                )}
                <ButtonPrimary
                    className={styles['registration-btn']}
                    type="submit"
                    disabled={!formIsValid}
                >
                    Sign UP
                </ButtonPrimary>

                <p>
                    Already have an account? &nbsp;
                    <Link className={styles['registration-link']} to="/login">
                        Login
                    </Link>
                </p>
            </Box>
        </div>
    );
};
export default RegisterPage;
