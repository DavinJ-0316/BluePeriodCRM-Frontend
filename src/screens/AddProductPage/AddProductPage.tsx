import { Box } from '@mui/material';
import BackToProduct from './components/BackToProduct';
import styles from './AddProductPage.module.scss';
import AddProductForm from './components/AddProductForm';

const AddProductPage = () => (
    <>
        <BackToProduct />
        <Box className={styles['addproductcontent-title']} />
        <AddProductForm />
    </>
);

export default AddProductPage;
