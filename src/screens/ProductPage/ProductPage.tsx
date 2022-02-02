import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/material';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import ProductPageSearchBar from './components/ProductPageSearchBar';
import ProductDataGrid from './components/ProductDataGrid';
import ProductToggleBtn from './components/ProductToggleBtn';
import styles from './ProductPage.module.scss';

const ProductPage = () => (
    <>
        <Box className={styles['productPage-box']}>
            <Typography className={styles['productPage-header']}>Products</Typography>
            <Link to="add">
                <ButtonPrimary className={styles['productPage-addbtn']}>
                    <AddIcon className={styles['productPage-addicon']} />
                    Add
                </ButtonPrimary>
            </Link>
        </Box>
        <Box className={styles['productPage-box_white']}>
            <ProductToggleBtn />
            <ProductPageSearchBar />
            <ProductDataGrid />
        </Box>
    </>
);

export default ProductPage;
