import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from './SelectField.module.scss';

export interface SelectFieldProps {
    id: string;
    label: string;
    className?: string;
    required?: boolean | null;
    disabled?: boolean | null;
    value: string | number;
    children: React.ReactNode;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const CssSelectField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#08192d',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#08192d',
        },
    },
});

const SelectField: React.FC<SelectFieldProps> = (props: SelectFieldProps) => {
    const { id, label, onChange, value, onBlur, className, disabled, required, children } = props;

    return (
        <CssSelectField
            className={`${styles.selectfield} ${className}`}
            size="small"
            select
            {...((required && { required: true }) || '')}
            {...((disabled && { disabled: true }) || '')}
            id={id}
            label={label}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
        >
            {children}
        </CssSelectField>
    );
};

export default SelectField;
