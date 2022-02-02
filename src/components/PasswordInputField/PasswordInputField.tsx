import React, { useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from './PasswordInputField.module.scss';

const CssFormControl = styled(FormControl)({
    '& label.Mui-focused': {
        color: '#08192d',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#08192d',
        },
    },
});

export interface PasswordInputFieldProps {
    id: string;
    label: string;
    className?: string;
    type: string;
    value: string | number;
    error: boolean | null;
    required: boolean | null;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
interface State {
    showPassword: boolean;
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = (props) => {
    const { id, value, label, className, error, required, onBlur, onChange } = props;

    const [values, setValues] = useState<State>({ showPassword: false });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <CssFormControl
            className={`${styles.passwordinputfield} ${className}`}
            variant="outlined"
            size="small"
            {...((error && { error: true }) || '')}
            {...((required && { required: true }) || '')}
        >
            <InputLabel htmlFor={label}>{label}</InputLabel>
            <OutlinedInput
                id={id}
                label={label}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </CssFormControl>
    );
};

export default PasswordInputField;
