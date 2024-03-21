import { Route, Routes } from 'react-router-dom';
import OrderDetail from '~/pages/users/OrderDetail';
import ListProduct from '~/pages/users/ListProduct';
import AddProduct from '~/pages/users/ListProduct/AddProduct';
import EditProduct from '~/pages/users/ListProduct/EditProduct';
import OrderSuccess from '~/pages/users/OrderSuccess';
import HomePage from '~/pages/users/homePage';
import ProfilePage from '~/pages/users/profilePage';
import MasterLayout from '~/pages/users/theme/masterLayout';
import { ROUTERS } from '~/utils/router';
import Dashboard from '~/pages/users/Dashboard';

const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage />,
        },
        {
            path: ROUTERS.USER.PROFILE,
            component: <ProfilePage />,
        },
        {
            path: 'listproduct',
            component: <ListProduct />,
        },
        {
            path: 'addproduct',
            component: <AddProduct />,
        },
        {
            path: '/editproduct/:id',
            component: <EditProduct />,
        },
        {
            path: '/order',
            component: <OrderSuccess />,
        },
        {
            path: '/orderdetail/:id',
            component: <OrderDetail />,
        },
        {
            path: '/dashboard',
            component: <Dashboard />,
        },
    ];
    return (
        <MasterLayout>
            <Routes>
                {userRouters.map((item, key) => (
                    <Route key={key} path={item.path} element={item.component} />
                ))}
            </Routes>
        </MasterLayout>
    );
};

const RouterCustom = () => {
    return renderUserRouter();
};

export default RouterCustom;
