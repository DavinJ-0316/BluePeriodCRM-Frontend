import { OutlinedInput, InputLabel, FormControl } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import styles from './InputField.module.scss';

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

export interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    className?: string;
    error?: boolean | null;
    required?: boolean | null;
    disabled?: boolean | null;
    value: string | number;
    select?: boolean;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const InputField: React.FC<InputFieldProps> = (props) => {
    const {
        id,
        label,
        type,
        onChange,
        value,
        onBlur,
        className,
        disabled,
        required,
        error = null,
        select,
    } = props;
    return (
        <CssFormControl
            className={`${styles.inputfield} ${className}`}
            variant="outlined"
            size="small"
            {...((error && { error: true }) || '')}
            {...((required && { required: true }) || '')}
            {...((disabled && { disabled: true }) || '')}
            {...(select || '')}
        >
            <InputLabel htmlFor={label} {...(error || '')}>
                {label}
            </InputLabel>
            <OutlinedInput
                id={id}
                label={label}
                type={type}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                {...(error || '')}
                {...(select || '')}
            />
        </CssFormControl>
    );
};

export default InputField;
