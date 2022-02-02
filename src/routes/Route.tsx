import { lazy } from 'react';
import { Route as RouterPage, Routes, Navigate } from 'react-router-dom';
import ProtectedRouterPage from './components';
import MainLayout from '../layouts/MainLayout';
import SubLayout from '../layouts/SubLayout';

import ProductDetailPage from '../screens/ProductDetailPage';

const LoginPage = lazy(() => import('../screens/LoginPage'));
const RegisterPage = lazy(() => import('../screens/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../screens/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../screens/ResetPasswordPage'));
const VerifyEmailPage = lazy(() => import('../screens/VerifyEmailPage'));
const DashboardPage = lazy(() => import('../screens/DashboardPage'));
const UserPage = lazy(() => import('../screens/UserPage'));
const CustomerPage = lazy(() => import('../screens/CustomerPage'));
const CustomerDetailPage = lazy(() => import('../screens/CustomerDetailPage'));
const CustomerEditPage = lazy(() => import('../screens/CustomerEditPage'));
const AddCustomerPage = lazy(() => import('../screens/AddCustomerPage'));
const ProductPage = lazy(() => import('../screens/ProductPage'));
const ProductEditPage = lazy(() => import('../screens/ProductEditPage'));
const AddProductPage = lazy(() => import('../screens/AddProductPage'));
const OrderPage = lazy(() => import('../screens/OrderPage'));
const InvoicePage = lazy(() => import('../screens/InvoicePage'));
const InvocieDetailPage = lazy(() => import('../screens/InvoiceDetailPage'));
const OrderEditPage = lazy(() => import('../screens/OrderEditPage'));
const MyProfilePage = lazy(() => import('../screens/MyProfilePage'));
const AccountPage = lazy(() => import('../screens/AccountSetting'));
const ErrorPage = lazy(() => import('../screens/ErrorPage'));

const Route = () => (
    <Routes>
        <RouterPage path="/" element={<Navigate replace to="/login" />} />
        <RouterPage path="/login" element={<LoginPage />} />
        <RouterPage path="/register" element={<RegisterPage />} />
        <RouterPage path="/emailActivation" element={<VerifyEmailPage />} />
        <RouterPage path="/resetPassword" element={<ResetPasswordPage />} />
        <RouterPage path="/forgetpassword" element={<ForgotPasswordPage />} />
        <RouterPage element={<ProtectedRouterPage />}>
            <RouterPage
                path="/dashboard"
                element={
                    <MainLayout>
                        <DashboardPage />
                    </MainLayout>
                }
            />
            <RouterPage
                path="/users"
                element={
                    <MainLayout>
                        <UserPage />
                    </MainLayout>
                }
            />
            <RouterPage
                path="/users/:email/profile"
                element={
                    <SubLayout>
                        <MyProfilePage />
                    </SubLayout>
                }
            />
            <RouterPage
                path="/users/:email/profile/accountsetting"
                element={
                    <SubLayout>
                        <AccountPage />
                    </SubLayout>
                }
            />
            <RouterPage
                path="/customers/*"
                element={
                    <MainLayout>
                        <CustomerPage />
                    </MainLayout>
                }
            />
            <RouterPage
                path="/customers/:email"
                element={
                    <SubLayout>
                        <CustomerDetailPage />
                    </SubLayout>
                }
            />
            <RouterPage
                path="/customers/:email/edit"
                element={
                    <SubLayout>
                        <CustomerEditPage />
                    </SubLayout>
                }
            />
            <RouterPage
                path="/customers/add"
                element={
                    <SubLayout>
                        <AddCustomerPage />
                    </SubLayout>
                }
            />
            <RouterPage
                path="/products"
                element={
                    <MainLayout>
                        <ProductPage />
                    </MainLayout>
                }
            />
            <RouterPage
                path="/products/add"
                element={
                    <SubLayout>
                        <AddProductPage />
                    </SubLayout>
                }
            />
            <RouterPage
                path="/products/:sku"
                element={
                    <SubLayout>
                        <ProductDetailPage />
                    </SubLayout>
                }
            />
            <RouterPage
                path="/products/:sku/edit"
                element={
                    <SubLayout>
                        <ProductEditPage />
                    </SubLayout>
                }
            />
            <RouterPage
                path="/orders/:id"
                element={
                    <MainLayout>
                        <OrderEditPage />
                    </MainLayout>
                }
            />
            <RouterPage
                path="/orders"
                element={
                    <MainLayout>
                        <OrderPage />
                    </MainLayout>
                }
            />
            <RouterPage
                path="/invoices"
                element={
                    <MainLayout>
                        <InvoicePage />
                    </MainLayout>
                }
            />
            <RouterPage
                path="/invoices/:id"
                element={
                    <SubLayout>
                        <InvocieDetailPage />
                    </SubLayout>
                }
            />
        </RouterPage>
        <RouterPage path="*" element={<ErrorPage />} />
    </Routes>
);

export default Route;
