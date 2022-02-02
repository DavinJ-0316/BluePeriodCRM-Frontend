import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import BackPage from '../../../../components/BackPage/BackPage';
import styles from '../../AccountPage.module.scss';

export interface HeaderProps {
    fullName: string;
    initialName: string;
}

const AccountHeading: React.FC<HeaderProps> = (props: HeaderProps) => {
    const { initialName } = props;

    return (
        <>
            <BackPage to="/dashboard" title="Back" />
            <Box className={styles['userdetail-heading']}>
                <Stack direction="row" spacing={2}>
                    <Avatar className={styles['userdetail-heading-avatar']}>
                        <h2> {initialName}</h2>
                    </Avatar>
                    <Typography
                        className={styles['userdetail-heading-username']}
                        noWrap
                        component="div"
                    >
                        Account Settings
                    </Typography>
                </Stack>
            </Box>
        </>
    );
};

export default AccountHeading;
