import { Box } from '@mui/material';
import styles from '../../CustomerEditPage.module.scss';

export interface HeaderProps {
    email: string;
    name: string;
}

const EditCustomerHeader: React.FC<HeaderProps> = (props: HeaderProps) => {
    const { email, name } = props;

    return (
        <Box className={styles['editcontent-title']}>
            <h2 className={styles['editcontent-title-custname']}>{name}</h2>
            <h3 className={styles['editcontent-title-custemailtitle']}>
                Email:
                <span className={styles['editcontent-title-custemail']}>{email}</span>
            </h3>
        </Box>
    );
};

export default EditCustomerHeader;
