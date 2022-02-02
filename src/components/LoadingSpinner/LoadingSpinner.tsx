import { CircularProgress } from '@mui/material';
import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = () => (
    <div className={styles.spinner}>
        <CircularProgress />
    </div>
);

export default LoadingSpinner;
