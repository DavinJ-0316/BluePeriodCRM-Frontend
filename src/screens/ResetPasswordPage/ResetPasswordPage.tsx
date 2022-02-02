import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, Alert } from '@mui/material';
import PasswordInputField from '../../components/PasswordInputField';
import { validatePassword } from '../../utils/validator';
import {
    authUserSuccess,
    authUserStatus,
    authError,
    resetUserPassword,
    regMessage,
} from '../../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useInput from '../../hooks/useInput';
import ButtonPrimary from '../../components/Button';
import styles from './ResetPasswordPage.module.scss';

const inputPasswordIsValid = (value: string) => validatePassword(value) && value.trim() !== '';

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ResetPasswordPage = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const isSuccess = useAppSelector(authUserSuccess);
    const errorMsg = useAppSelector(authError);
    const status = useAppSelector(authUserStatus);
    const message = useAppSelector(regMessage);
    const dispatch = useAppDispatch();
    const [formIsValid, setFormIsValid] = useState(true);

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
            setFormIsValid(isPasswordValid && isComfirmPasswordValid);
        });

        return () => {
            clearTimeout(identifier);
        };
    }, [isPasswordValid, isComfirmPasswordValid]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formIsValid === false) {
            return;
        }

        const data = {
            token: query.get('token'),
            password: passwordValue,
            confirmedPassword: comfirmPasswordValue,
        };

        dispatch(resetUserPassword(data));

        resetpassword();
        resetComfirmPassword();
    };

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                navigate({ pathname: `/login` });
            }, 5000);
        }
    }, [dispatch, isSuccess, navigate]);

    return (
        <Container className={styles['resetpassword-container']}>
            <Box
                className={styles['resetpassword-box']}
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <h1 className={styles['resetpassword-title']}>Reset Password</h1>
                <Box className={styles['resetpassword-inputfield']}>
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
                        <p className={styles['resetpassword-error']}>
                            Please Enter valid password <br />
                            (Include letter, number and !, @, #, $, %, ^, _, &, * )
                        </p>
                    )}
                </Box>
                <Box className={styles['resetpassword-inputfield']}>
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
                        <p className={styles['resetpassword-error']}>Password must be same</p>
                    )}
                </Box>
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
                    className={styles['resetpassword-btn']}
                    type="submit"
                    disabled={!formIsValid}
                >
                    Reset Password
                </ButtonPrimary>
            </Box>
        </Container>
    );
};

export default ResetPasswordPage;
