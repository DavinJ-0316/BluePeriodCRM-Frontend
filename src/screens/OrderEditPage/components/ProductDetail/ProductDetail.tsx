import { Divider, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IProduct } from '../../../../types/IOrder';
import {
    MoneyTag,
    PrimaryKeyLayout,
} from '../../../../components/DataGridTable/components/DataGridCells/DataGridCells';
import styles from './ProductDetail.module.scss';

interface IProductDetailProps {
    products: IProduct[];
    className?: string;
}

const ProductDetail: React.FC<IProductDetailProps> = (props: IProductDetailProps) => {
    const { products, className } = props;
    const totalPrice = products.reduce((prev, p) => prev + p.price * p.quantity, 0);

    return (
        <Paper elevation={3} className={`${styles.productDetail} ${className}`}>
            <h3 className={styles.productDetail_title}>Order Items</h3>
            <Divider />
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className={styles.productDetail_tableHead}>
                        <TableRow>
                            <TableCell>
                                <h3 className={styles.productDetail_tableTitle}>Product</h3>
                            </TableCell>
                            <TableCell align="right">
                                <h3 className={styles.productDetail_tableTitle}>Quantity</h3>
                            </TableCell>
                            <TableCell align="right">
                                <h3 className={styles.productDetail_tableTitle}>Price</h3>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((row) => (
                            <TableRow
                                key={row.sku}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <PrimaryKeyLayout
                                        primary={row.productName}
                                        secondary={
                                            row.description === undefined ? '' : row.description
                                        }
                                        linkAddress={`/product/${row.sku}`}
                                    />
                                </TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                                <TableCell align="right">
                                    <MoneyTag amount={row.price} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider />
            <div className={styles.productDetail_total}>
                <p className={styles.productDetail_paddingRigh}>Total Price: </p>
                <MoneyTag amount={totalPrice} />
            </div>
        </Paper>
    );
};
ProductDetail.defaultProps = {
    className: '',
};

export default ProductDetail;
