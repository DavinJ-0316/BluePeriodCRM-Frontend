import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import CustomerPageSearchBar from './components/CustomerPageSearchBar';
import CustomerDataGrid from './components/CustomerDataGrid/CustomerDataGrid';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import styles from './CustomerPage.module.scss';

const CustomerPage = () => (
    <>
        <Box className={styles['customerpage-box']}>
            <Typography className={styles['customerpage-header']}>Customers</Typography>
            <Link to="add">
                <ButtonPrimary className={styles['customerpage-addbtn']}>
                    <AddIcon className={styles['customerpage-addicon']} />
                    <span>Add</span>
                </ButtonPrimary>
            </Link>
        </Box>
        <CustomerPageSearchBar />
        <CustomerDataGrid />
    </>
);

export default CustomerPage;
