import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import {
    HomeOutlined as Dashboard,
    PeopleOutlined as Customer,
    ShoppingBasketOutlined as Product,
    ShoppingCartOutlined as Order,
    Description as Invoice,
} from '@mui/icons-material';
import MainIcon from '../../assets/images/logos/blueLogoNoBG.png';

import styles from './SideNav.module.scss';

const SideNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            id: 'dashboard',
            text: 'Dashboard',
            icon: <Dashboard className={styles.listItemIcon} />,
            path: '/dashboard',
        },
        {
            id: 'customers',
            text: 'Customers',
            icon: <Customer className={styles.listItemIcon} />,
            path: '/customers',
        },
        {
            id: 'products',
            text: 'Products',
            icon: <Product className={styles.listItemIcon} />,
            path: '/products',
        },
        {
            id: 'orders',
            text: 'Orders',
            icon: <Order className={styles.listItemIcon} />,
            path: '/orders',
        },
        {
            id: 'invoices',
            text: 'Invoices',
            icon: <Invoice className={styles.listItemIcon} />,
            path: '/invoices',
        },
    ];

    return (
        <div className={styles.sideNav}>
            <Drawer
                className={styles['sideNav-drawer']}
                variant="permanent"
                anchor="left"
                classes={{ paper: styles['sideNav-drawerPaper'] }}
            >
                <NavLink to="/dashboard">
                    <div className={styles['sideNav-header-logo']}>
                        <img src={MainIcon} alt="mainicon" />
                    </div>
                </NavLink>
                <div className={styles['sideNav-menu']}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem key={item.id}>
                                <ListItemButton
                                    onClick={() => navigate(item.path)}
                                    className={
                                        location.pathname === item.path ? styles.active : undefined
                                    }
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        className={styles['sideNav-menu-text']}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default SideNav;
