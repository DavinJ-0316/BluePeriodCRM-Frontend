import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import ButtonPrimary from '../../../../components/Button';
import styles from '../../MyProfilePage.module.scss';
import DeleteConfirmation from '../../../../components/DeleteConfirmationModal';
import { IUser } from '../../../../types/IUser';
import { deleteMe, clearState } from '../../../../store/slices/userSlice';
import { useAppDispatch } from '../../../../hooks/redux';

export interface DetailsProps {
    user: IUser;
}

const MyProfile: React.FC<DetailsProps> = (props: DetailsProps) => {
    const [openPopup, setOpenPopup] = useState(false);
    const showModal = () => setOpenPopup(true);
    const { user } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(
        () => () => {
            dispatch(clearState());
        },
        [dispatch],
    );

    const deleteHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        dispatch(deleteMe({ email: user.email }));

        navigate({ pathname: '/' });
    };

    const details = [
        { name: 'Email', value: user ? user.email : '' },
        {
            name: 'User Name',
            value: `${user ? user.firstName : ''} ${user ? user.lastName : ''}`,
        },
        { name: 'Phone', value: user ? user.phone : '' || 'No provided' },
    ];

    return (
        <>
            <Box className={styles['userdetail-details']}>
                <span className={styles['userdetail-details-title']}>Basic Details</span>
                <Divider />
                <List className={styles['userdetail-details-section']}>
                    {details.map((detail) => (
                        <div key={detail.name}>
                            <ListItem className={styles['userdetail-details-itemtext']}>
                                <ListItemText primary={detail.name} secondary={detail.value} />
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
            </Box>
            <Box className={styles['userdetail-details']}>
                <span className={styles['userdetail-details-title']}>Data Management</span>
                <Divider />
                <Box className={styles['userdetail-details-delete']}>
                    <ButtonPrimary
                        className={styles['userdetail-details-delete-btn']}
                        onClick={showModal}
                    >
                        Delete Account
                    </ButtonPrimary>
                    <DeleteConfirmation
                        name={details[1].value || ''}
                        onClick={deleteHandler}
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    />
                    <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;Remove this account then the information can never
                        be recovered
                    </span>
                </Box>
            </Box>
        </>
    );
};

export default MyProfile;
