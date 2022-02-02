import { ListItem } from '@mui/material';
import React from 'react';
import styles from './InlineField.module.scss';

interface IIlineField {
    className?: string;
    field: string;
    data: React.ReactNode;
}

const InlineField: React.FC<IIlineField> = (props: IIlineField) => {
    const { field, data, className } = props;
    return (
        <ListItem className={`${styles.InlineField} ${className}`}>
            <div className={styles.InlineField_left}> {field}:</div>
            <div className={styles.InlineField_right}>{data}</div>
        </ListItem>
    );
};
InlineField.defaultProps = {
    className: '',
};

export default InlineField;
