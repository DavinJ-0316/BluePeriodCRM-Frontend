import { Buffer } from 'buffer';
import IInvoice from '../types/IInvoice';
import { getPDFBuffer } from '../services/invoice';

const HandlePreviewInvoice = async (invoice: IInvoice) => {
    const response = await getPDFBuffer(invoice);
    const string64: string = await response.body;
    const arrayBuffer = Buffer.from(string64, 'base64');
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    const link = window.URL.createObjectURL(blob);
    window.open(link);
};

export default HandlePreviewInvoice;
