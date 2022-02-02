import { Divider } from '@mui/material';
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
import styles from './TaxedProductTable.module.scss';

interface IProductDetailProps {
    products: IProduct[];
    className?: string;
}

const TaxedProductTable: React.FC<IProductDetailProps> = (props: IProductDetailProps) => {
    const { products, className } = props;
    const totalPrice = products.reduce((prev, p) => prev + p.price * p.quantity, 0);

    return (
        <div className={`${styles.productDetail} ${className}`}>
            <TableContainer>
                <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className={styles.productDetail_tableHead}>
                        <TableRow>
                            <TableCell>
                                <h3 className={styles.productDetail_tableTitle}>
                                    Product Description
                                </h3>
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
                <div className={styles.productDetail_spaceBetween}>
                    <p>Subtotal Price: </p>
                    <MoneyTag amount={Math.round(totalPrice * 0.9)} />
                </div>
            </div>
            <Divider />
            <div className={styles.productDetail_total}>
                <div className={styles.productDetail_spaceBetween}>
                    <p>Tax: </p>
                    <MoneyTag amount={Math.round(totalPrice * 0.1)} />
                </div>
            </div>
            <Divider />
            <div className={styles.productDetail_total}>
                <div className={styles.productDetail_spaceBetween}>
                    <p>Total Price: </p>
                    <MoneyTag amount={totalPrice} />
                </div>
            </div>
        </div>
    );
};
TaxedProductTable.defaultProps = {
    className: '',
};

export default TaxedProductTable;
