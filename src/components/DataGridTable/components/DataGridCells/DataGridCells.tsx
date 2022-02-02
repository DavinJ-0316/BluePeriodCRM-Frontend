import * as React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './DataGridCells.module.scss';

interface IPrimaryKeyLayoutProps {
    primary: string;
    secondary: string;
    linkAddress?: string;
}

export const PrimaryKeyLayout: React.FC<IPrimaryKeyLayoutProps> = (props) => {
    const { primary, secondary, linkAddress } = props;

    return (
        <div className={styles.layout}>
            {linkAddress ? (
                <Link to={linkAddress}>
                    <Button className={styles.layout_primary}>{primary}</Button>
                </Link>
            ) : (
                <p className={styles.layout_primary_noHover}>{primary}</p>
            )}
            <p className={styles.layout_secondary}>{secondary}</p>
        </div>
    );
};
PrimaryKeyLayout.defaultProps = {
    linkAddress: undefined,
};
export const MoneyTag: React.FC<{ amount: number }> = (props) => {
    const { amount } = props;
    return <p className={styles.dollar_color}>{`$${amount}`}</p>;
};

export default PrimaryKeyLayout;
