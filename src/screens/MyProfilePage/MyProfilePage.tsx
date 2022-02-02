import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import TabFilter from '../../components/TabFilter';
import { authUser, fetchUserByEmail } from '../../store/slices/userSlice';
import MyProfile from './components/MyProfile';
import MyProfileHeading from './components/MyProfileHeading';
import MyProfileEditForm from './components/MyProfileEditForm';
import MyProfileSecurity from './components/MyProfileSecurity';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IUser } from '../../types/IUser';

const MyProfilePage = () => {
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
            name: 'General',
            children: <MyProfile user={fetchedUser} />,
        },
        {
            name: 'Edit Profile',
            children: <MyProfileEditForm user={fetchedUser} />,
        },
        {
            name: 'Security',
            children: <MyProfileSecurity user={fetchedUser} />,
        },
    ];

    return (
        <Container>
            <>
                <MyProfileHeading fullName={fullName} initialName={initialName} />
                <TabFilter filter={FILTER_TITLES} />
            </>
        </Container>
    );
};

export default MyProfilePage;
