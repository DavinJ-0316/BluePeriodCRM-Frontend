import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import styles from './Header.module.scss';
import { logOut, authUser } from '../../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IUser } from '../../types/IUser';

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logout = useCallback(() => {
        dispatch(logOut());
    }, [dispatch]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler = () => {
        logout();
        navigate('/login');
    };

    const user = useAppSelector(authUser);

    const tempUser: IUser = user ? user.user : null;
    const loginUser = tempUser || user;

    const email = loginUser ? loginUser.email || '' : '';
    const firstName = loginUser ? loginUser.firstName || '' : '';
    const lastName = loginUser ? loginUser.lastName || '' : '';
    const fullName = `${firstName} ${lastName}`;
    const initialName = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            className={styles['header-menu']}
            anchorEl={anchorEl}
            marginThreshold={0}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => navigate(`/users/${email}/profile`)}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    className={(styles['header-color'], styles['header-iconsize'])}
                >
                    <AccountCircleOutlinedIcon />
                </IconButton>
                <p className={styles['header-p']}>My Profile </p>
            </MenuItem>
            <MenuItem onClick={() => navigate(`/users/${email}/profile/accountsetting`)}>
                <IconButton
                    size="large"
                    aria-label="setting of current acount"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    className={(styles['header-color'], styles['header-iconsize'])}
                >
                    <SettingsOutlinedIcon />
                </IconButton>
                <p className={styles['header-p']}>Account Settings</p>
            </MenuItem>
            <MenuItem onClick={logoutHandler} className={styles['header-logout']}>
                <IconButton
                    size="large"
                    aria-label="logout of current account"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    className={(styles['header-color'], styles['header-iconsize'])}
                >
                    <LogoutOutlinedIcon />
                </IconButton>
                <p className={styles['header-p']}>Logout</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box className={styles['header-box']}>
            <AppBar className={styles['header-appbar']}>
                <Toolbar className={styles['header-toolbar']}>
                    <Box className={styles['header-box2']} />
                    <Box>
                        <IconButton
                            className={styles['header-btn']}
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                        >
                            <Avatar className={styles['header-avatar']}>{initialName}</Avatar>
                            <Typography
                                className={styles['header-typography']}
                                noWrap
                                component="div"
                            >
                                {fullName}
                            </Typography>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
};

export default Header;
