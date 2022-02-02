import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import TabFilter from '../../components/TabFilter';
import { authUser, fetchUserByEmail } from '../../store/slices/userSlice';
import Account from './components/Account';
import AccountHeading from './components/AccountHeading';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IUser } from '../../types/IUser';

const AccountPage = () => {
    const dispatch = useAppDispatch();
    const { email } = useParams();

    const fetchedUser: IUser = useAppSelector(authUser);

    const firstName = fetchedUser ? fetchedUser.firstName || '' : '';
    const lastName = fetchedUser ? fetchedUser.lastName || '' : '';
    const fullName = `${firstName} ${lastName}`;
    const initialName = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

    useEffect(() => {
        dispatch(fetchUserByEmail(email));
    }, [dispatch, email]);

    const FILTER_TITLES = [
        {
            name: fullName,
            children: <Account user={fetchedUser} />,
        },
    ];

    return (
        <Container>
            <>
                <AccountHeading fullName={fullName} initialName={initialName} />
                <TabFilter filter={FILTER_TITLES} />
            </>
        </Container>
    );
};

export default AccountPage;
