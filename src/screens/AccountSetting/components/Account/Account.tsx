import React from 'react';
import { Box, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ButtonPrimary from '../../../../components/Button';
import styles from '../../AccountPage.module.scss';
import { IUser } from '../../../../types/IUser';

export interface DetailsProps {
    user: IUser;
}

const Account: React.FC<DetailsProps> = (props: DetailsProps) => {
    const { user } = props;

    const details = [
        {
            name: 'Billing Name',
            value: `${user ? user.firstName : ''} ${user ? user.lastName : ''}`,
        },
        { name: 'Card number', value: '**** 1111' },
        { name: 'Country', value: 'Australia' },
        { name: 'Zip / Postal code', value: '4000' },
    ];

    const plans = [
        { fee: '0', value: ['startup', 'using now'] },
        { fee: '4.99', value: ['Standard'] },
        { fee: '29.99', value: ['Business'] },
    ];

    return (
        <Box className={styles['userdetail-details']}>
            <span className={styles['userdetail-details-title']}>Change Plan</span>
            <span className={styles['userdetail-details-subtitle']}>
                You can upgrade and downgrade whenever you want
            </span>
            <div className={styles['userdetail-details-plansection']}>
                {plans.map((plan) => (
                    <ButtonPrimary key={plan.fee} className={styles['userdetail-details-plan']}>
                        <List className={styles['userdetail-details-plan-lines']}>
                            <ListItem className={styles['userdetail-details-plan-line1']}>
                                <h1>${plan.fee}</h1>
                                <p>/m</p>
                            </ListItem>
                            <ListItem className={styles['userdetail-details-plan-line2']}>
                                <div className={styles['userdetail-details-plan-left']}>
                                    {plan.value[0]}
                                </div>
                                <div className={styles['userdetail-details-plan-right']}>
                                    {plan.value[1] || ''}
                                </div>
                            </ListItem>
                        </List>
                    </ButtonPrimary>
                ))}
            </div>
            <Divider />
            <Box className={styles['userdetail-details-addressbox']}>
                <span className={styles['userdetail-details-title']}>Billing details</span>
                <ButtonPrimary className={styles['userdetail-details-editbtn']}>
                    <EditOutlinedIcon className={styles['userdetail-details-editicon']} />
                    <span>Edit</span>
                </ButtonPrimary>
            </Box>
            <List className={styles['userdetail-details-section']}>
                {details.map((detail) => (
                    <div key={detail.name}>
                        {details.indexOf(detail) > 0 ? <Divider /> : ''}
                        <ListItem className={styles['userdetail-details-itemtext']}>
                            <ListItemText
                                className={styles['userdetail-details-itemtext-left']}
                                primary={detail.name}
                            />
                            <ListItemText
                                className={styles['userdetail-details-itemtext-right']}
                                secondary={detail.value}
                            />
                        </ListItem>
                    </div>
                ))}
            </List>
            <Box className={styles['userdetail-upgrade-box']}>
                <span className={styles['userdetail-upgrade-subtitle']}>
                    We cannot refund once you purchased a subscription, but you can always
                    <Button variant="text" className={styles['userdetail-upgrade-subtitle-btn']}>
                        cancel
                    </Button>
                </span>
            </Box>
            <Box className={styles['userdetail-upgrade-btnsection']}>
                <ButtonPrimary className={styles['userdetail-upgrade-btn']} type="submit">
                    Upgrade plan
                </ButtonPrimary>
            </Box>
        </Box>
    );
};

export default Account;
