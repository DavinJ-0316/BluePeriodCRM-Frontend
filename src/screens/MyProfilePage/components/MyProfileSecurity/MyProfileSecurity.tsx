import { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Divider, Alert } from '@mui/material';
import ButtonPrimary from '../../../../components/Button';
import styles from '../../MyProfilePage.module.scss';
import { IUser } from '../../../../types/IUser';
import PasswordInputField from '../../../../components/PasswordInputField';
import useInput from '../../../../hooks/useInput';
import { validatePassword } from '../../../../utils/validator';
import { authError, authUserStatus, updateMyPassword } from '../../../../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

const inputPasswordIsValid = (value: string) => validatePassword(value) && value.trim() !== '';

export interface DetailsProps {
    user: IUser;
}

const MyProfileSecurity: React.FC<DetailsProps> = (props: DetailsProps) => {
    const { user } = props;
    const [formIsValid, setFormIsValid] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const dispatch = useAppDispatch();

    const errorMsg = useAppSelector(authError);
    const status = useAppSelector(authUserStatus);

    const {
        value: passwordValue,
        isValid: isPasswordValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput(inputPasswordIsValid, '');
    const {
        value: newPasswordValue,
        isValid: isNewPasswordValid,
        hasError: newPasswordHasError,
        valueChangeHandler: newPasswordChangeHandler,
        inputBlurHandler: newPasswordBlurHandler,
    } = useInput(inputPasswordIsValid, '');

    const {
        value: comfirmPasswordValue,
        isValid: isComfirmPasswordValid,
        hasError: comfirmPasswordHasError,
        valueChangeHandler: comfirmPasswordChangeHandler,
        inputBlurHandler: comfirmPasswordBlurHandler,
    } = useInput(inputPasswordIsValid, '');

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(isPasswordValid && isComfirmPasswordValid && isNewPasswordValid);
        });

        return () => {
            clearTimeout(identifier);
        };
    }, [isPasswordValid, isNewPasswordValid, isComfirmPasswordValid]);

    const details = [
        { name: 'Password', value: user.email },
        { name: 'New Password', value: `${user.firstName} ${user.lastName}` },
        { name: 'Confirm Password', value: user.phone || 'No provided' },
    ];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formIsValid === false) {
            return;
        }
        const data = {
            email: user.email,
            currentPassword: passwordValue,
            password: newPasswordValue,
            confirmedPassword: comfirmPasswordValue,
        };

        dispatch(updateMyPassword(data));
        setFormSubmitted(true);
    };

    return (
        <Box className={styles['userdetail-details']} component="form" onSubmit={handleSubmit}>
            <span className={styles['userdetail-details-title']}>Password</span>
            <Divider />
            <List className={styles['userdetail-details-section']}>
                <ListItem
                    key={details[0].name}
                    className={styles['userdetail-details-passwordtext']}
                >
                    <div className={styles['userdetail-details-passwordtext-name']}>
                        <ListItemText primary={details[0].name} />
                    </div>
                    <div className={styles['userdetail-details-passwordtext-input']}>
                        <PasswordInputField
                            required
                            id="password"
                            label="Current Password"
                            type="password"
                            value={passwordValue}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                            error={passwordHasError}
                        />
                        {passwordHasError && (
                            <p className={styles['userdetail-details-passwordtext-error']}>
                                Please Enter valid password
                            </p>
                        )}
                    </div>
                </ListItem>
                <Divider />
                <ListItem
                    key={details[1].name}
                    className={styles['userdetail-details-passwordtext']}
                >
                    <div className={styles['userdetail-details-passwordtext-name']}>
                        <ListItemText primary={details[1].name} />
                    </div>
                    <div className={styles['userdetail-details-passwordtext-input']}>
                        <PasswordInputField
                            required
                            id="newPassword"
                            label=" New Password"
                            type="password"
                            value={newPasswordValue}
                            onChange={newPasswordChangeHandler}
                            onBlur={newPasswordBlurHandler}
                            error={newPasswordHasError}
                        />
                        {newPasswordHasError && (
                            <p className={styles['userdetail-details-passwordtext-error']}>
                                Please Enter new valid password <br />
                                (Include letter, number and !, @, #, $, %, ^, _, &, * )
                            </p>
                        )}
                    </div>
                </ListItem>
                <Divider />
                <ListItem
                    key={details[2].name}
                    className={styles['userdetail-details-passwordtext']}
                >
                    <div className={styles['userdetail-details-passwordtext-name']}>
                        <ListItemText primary={details[2].name} />
                    </div>
                    <div className={styles['userdetail-details-passwordtext-input']}>
                        <PasswordInputField
                            required
                            id="confirmedPassword"
                            label="Confirm Password"
                            type="password"
                            value={comfirmPasswordValue}
                            onChange={comfirmPasswordChangeHandler}
                            onBlur={comfirmPasswordBlurHandler}
                            error={
                                comfirmPasswordValue !== newPasswordValue || comfirmPasswordHasError
                            }
                        />
                        {(comfirmPasswordHasError || comfirmPasswordValue !== newPasswordValue) && (
                            <p className={styles['userdetail-details-passwordtext-error']}>
                                Password must be same
                            </p>
                        )}
                    </div>
                </ListItem>
                <Divider />
            </List>
            {formSubmitted && status === 'failed' && errorMsg !== null ? (
                <Alert severity="error">
                    <strong>{errorMsg}</strong>
                </Alert>
            ) : (
                ''
            )}
            {formSubmitted && status === 'succeeded' ? (
                <Alert severity="success">
                    <strong>Password update successfully</strong>
                </Alert>
            ) : (
                ''
            )}
            <Box className={styles['userdetail-details-update']}>
                <ButtonPrimary
                    className={styles['userdetail-details-update-btn']}
                    disabled={!formIsValid}
                    type="submit"
                >
                    Change Password
                </ButtonPrimary>
            </Box>
        </Box>
    );
};

export default MyProfileSecurity;
