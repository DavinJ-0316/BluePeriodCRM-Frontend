import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import BackPage from '../../../../components/BackPage/BackPage';
import ButtonPrimary from '../../../../components/Button/ButtonPrimary';
import styles from '../../ProductDetailPage.module.scss';

export interface HeaderProps {
    sku: string;
    name: string;
}

const ProductDetailHeading: React.FC<HeaderProps> = (props: HeaderProps) => {
    const { sku, name } = props;

    return (
        <>
            <BackPage to="/products" title="Product" />
            <Box className={styles['productdetail-heading']}>
                <Box>
                    <h2 className={styles['productdetail-heading-prodname']}>{name}</h2>
                    <h3 className={styles['productdetail-heading-prodskutitle']}>
                        SKU:
                        <span className={styles['productdetail-heading-prodsku']}>{sku}</span>
                    </h3>
                </Box>
                <Link to={`/products/${sku}/edit`}>
                    <ButtonPrimary className={styles['productdetail-heading-btn']}>
                        <p>Edit</p>
                        <ModeEditOutlineOutlinedIcon />
                    </ButtonPrimary>
                </Link>
            </Box>
        </>
    );
};

export default ProductDetailHeading;
