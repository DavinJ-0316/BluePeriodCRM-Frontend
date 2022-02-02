import { Paper, Box } from '@mui/material';
import IInvoice from '../../../../types/IInvoice';
import styles from './InvoicePreview.module.scss';
import Logo from '../../../../assets/images/logos/blueLogoTextBlack.png';
import { addressInline, DateToDDMMMYYYYHHMM } from '../../../../utils/dataProcessor';
import TaxedProductTable from '../TaxedProductTable';

interface IInvoicePreviewProps {
    invoice: IInvoice;
}

const InvoicePreview: React.FC<IInvoicePreviewProps> = (props: IInvoicePreviewProps) => {
    const { invoice } = props;
    const { dateCreated, dateDue, customerInfo } = invoice;
    const dateIssued = DateToDDMMMYYYYHHMM(dateCreated);
    const dueDate = DateToDDMMMYYYYHHMM(dateDue);
    const customerAddress = addressInline(customerInfo.address);

    return (
        <Paper elevation={3} className={styles.invoicePreview}>
            <Box className={styles.invoicePreview_content}>
                <div className={styles.invoicePreview_content_spaceBetween}>
                    <div>
                        <img
                            src={Logo}
                            alt="Devils Logo"
                            className={styles.invoicePreview_content_logo}
                        />
                        <p className={styles.invoicePreview_content_emphesise}>
                            www.blueperiod.link
                        </p>
                    </div>
                    <div className={styles.invoicePreview_content_right}>
                        <h3 className={styles.invoicePreview_content_paid}>PAID</h3>
                        <p className={styles.invoicePreview_content_emphesise}>{invoice.orderId}</p>
                    </div>
                </div>
                <div className={`${styles.invoicePreview_content_spaceBetween}`}>
                    <div>
                        <p>Dora St, 12-22</p>
                        <p>Hurstville</p>
                        <p>NSW Australia 2222</p>
                    </div>
                    <div>
                        <p>Componay No. 4675092</p>
                        <p>EU VAT No. 949 41647 23</p>
                    </div>
                    <div className={styles.invoicePreview_content_right}>
                        <p>accounts@devils.io</p>
                        <p>(+61) 421 232 897</p>
                    </div>
                </div>
                <div className={`${styles.invoicePreview_content_spaceBetween}`}>
                    <div>
                        <p className={styles.invoicePreview_content_emphesise}>Date of Issued</p>
                        <p>{dateIssued.split(' ').splice(0, 3).join(' ')}</p>
                        <p>{dateIssued.split(' ').splice(3).join(' ')}</p>
                    </div>
                    <div className={styles.invoicePreview_content_right}>
                        <p className={styles.invoicePreview_content_emphesise}>Due Date</p>
                        <p>{dueDate.split(' ').splice(0, 3).join(' ')}</p>
                        <p>{dueDate.split(' ').splice(3).join(' ')}</p>
                    </div>
                    <div>
                        <p
                            className={`${styles.invoicePreview_content_emphesise} ${styles.invoicePreview_content_right}`}
                        >
                            Invoice Number
                        </p>
                        <p>{invoice.invoiceId}</p>
                    </div>
                </div>
                <div className={`${styles.invoicePreview_content_spaceBetween}`}>
                    <div>
                        <p className={styles.invoicePreview_content_emphesise}>Billed to</p>
                        <p>{invoice.customerInfo.name}</p>
                        <p>{invoice.customerInfo.email}</p>
                        <p>{invoice.customerInfo.phone}</p>
                        <p>{customerAddress}</p>
                    </div>
                </div>
                <TaxedProductTable products={invoice.products} />
                <div className={`${styles.invoicePreview_content_spaceBetween}`}>
                    <div>
                        <p className={styles.invoicePreview_content_emphesise}>Notes</p>
                        <p className={styles.invoicePreview_content_weakened}>
                            Please make sure you have the right bank registration number as I had
                            issues before and make sure you guys cover transfer expenses.
                        </p>
                    </div>
                </div>
            </Box>
        </Paper>
    );
};

export default InvoicePreview;
