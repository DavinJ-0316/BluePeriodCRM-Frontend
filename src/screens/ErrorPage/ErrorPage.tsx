import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.scss';
import error from '../../assets/images/error404.svg';
import ButtonPrimary from '../../components/Button';

const ErrorPage = () => (
    <Container className={styles.errorpage}>
        <h1 className={styles['errorpage-title']}>404: The page you are looking for isn’t here</h1>
        <h6 className={styles['errorpage-subtitle']}>
            You either tried some shady route or you came here by mistake. Whichever it is, try
            using the navigation.
        </h6>
        <img src={error} alt="error" />
        <Link to="/dashboard">
            <ButtonPrimary className={styles['errorpage-btn']}>Back to Dashboard</ButtonPrimary>
        </Link>
    </Container>
);

export default ErrorPage;
