import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, FormControlLabel, Checkbox, Alert } from '@mui/material';
import ButtonPrimary from '../../components/Button';
import InputField from '../../components/InputField';
import PasswordInputField from '../../components/PasswordInputField';
import useInput from '../../hooks/useInput';
import styles from './LoginPage.module.scss';
import { validateEmail, validatePassword } from '../../utils/validator';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login, authError, authUserStatus, clearState } from '../../store/slices/userSlice';
import MainIcon from '../../assets/images/logos/logoColorNoBG.png';

const inputEmailIsValid = (value: string) => validateEmail(value.toLowerCase());
const inputPasswordIsValid = (value: string) => validatePassword(value) && value.trim() !== '';

const LoginPage = () => {
    const [checked, setChecked] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const errorMsg = useAppSelector(authError);
    const status = useAppSelector(authUserStatus);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
    } = useInput(inputEmailIsValid, '');

    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetpassword,
    } = useInput(inputPasswordIsValid, '');

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(emailIsValid && passwordIsValid);
        });

        return () => {
            clearTimeout(identifier);
        };
    }, [emailIsValid, passwordIsValid]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (formIsValid === false) {
            return;
        }

        dispatch(
            login({
                email: emailValue,
                password: passwordValue,
            }),
        )
            .unwrap()
            .then(() => {
                navigate('/dashboard');
            });

        resetEmail();
        resetpassword();
    };

    useEffect(
        () => () => {
            dispatch(clearState());
        },
        [dispatch],
    );

    return (
        <div className={styles.login}>
            <img src={MainIcon} alt="mainicon" className={styles['login-logo']} />
            <Box
                className={styles['login-box']}
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <Typography className={styles['login-title']}>Login to your account</Typography>
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
                {emailHasError && <p className={styles['login-error']}>Please Enter valid Email</p>}
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
                    <p className={styles['login-error']}>Please Enter valid password</p>
                )}
                <FormControlLabel
                    className={styles['login-checkBox']}
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={(event) => setChecked(event.target.checked)}
                            name="checked"
                        />
                    }
                    label={<Typography variant="subtitle1">Remember me</Typography>}
                />

                {status === 'failed' && errorMsg !== null ? (
                    <Alert severity="error">
                        <strong>{errorMsg}</strong>
                    </Alert>
                ) : (
                    ''
                )}
                <ButtonPrimary
                    className={styles['login-btn']}
                    type="submit"
                    disabled={!formIsValid}
                >
                    Login
                </ButtonPrimary>
                <Box className={styles['login-bottom']}>
                    <p>
                        <Link className={styles['login-link']} to="/forgetpassword">
                            Forgot password?
                        </Link>
                    </p>
                    <p>
                        Don&lsquo;t have an account? &nbsp;
                        <Link className={styles['login-link']} to="/register">
                            Register
                        </Link>
                    </p>
                </Box>
            </Box>
        </div>
    );
};
export default LoginPage;
