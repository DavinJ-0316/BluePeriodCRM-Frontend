import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import ButtonPrimary from '../../../../components/Button/ButtonPrimary';
import styles from './AddButton.module.scss';

const OrderAddButton = () => (
    <Link to="add" className={styles['orderpage-btnsection']}>
        <ButtonPrimary className={styles['orderpage-addbtn']}>
            <AddIcon className={styles['orderpage-addicon']} />
            Add
        </ButtonPrimary>
    </Link>
);

export default OrderAddButton;
