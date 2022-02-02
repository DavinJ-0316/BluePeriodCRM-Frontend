import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
    const token = localStorage.getItem('AUTH_TOKEN');
    const user = { loggedIn: token };
    return user && user.loggedIn;
};

const ProtectedRouterPage = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate replace to="/login" />;
};

export default ProtectedRouterPage;
