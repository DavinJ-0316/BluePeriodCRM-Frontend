import * as React from 'react';
import styles from './statusBar.module.scss';

export type TStatus =
    | 'PENDING'
    | 'COMPLETED'
    | 'CANCELED'
    | 'REJECTED'
    | 'IN STOCK'
    | 'LIMITED'
    | 'OUT OF STOCK';

const colorsMatch = {
    PENDING: '#2196F3',
    COMPLETED: '#14B8A6',
    'IN STOCK': '#14B8A6',
    CANCELED: '#FFB020',
    LIMITED: '#FFB020',
    REJECTED: '#D14343',
    'OUT OF STOCK': '#D14343',
};

interface IStatusBar {
    status: TStatus;
}

const StatusBar: React.FC<IStatusBar> = (props) => {
    const { status } = props;
    const barColor = { backgroundColor: colorsMatch[status] };
    return (
        <div className={styles.barStyle} style={barColor}>
            <p className={styles.text}>{status}</p>
        </div>
    );
};

export default StatusBar;
