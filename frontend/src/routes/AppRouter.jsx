import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Dishes from '../pages/Dishes/Dishes';
import About from '../pages/About/About';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import AdminCategories from '../pages/Admin/AdminCategories';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminDishesById from '../pages/Admin/AdminDishesById';
import AdminDishes from '../pages/Admin/AdminDishes';
import AdminRoute from '../components/admin/AdminRoute';
import PrivateRoute from '../components/PrivateRoute';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import UserSignup from '../pages/Auth/UserSignup';
import UserLogin from '../pages/Auth/UserLogin';
import AvailableTables from '../pages/Tables/AvailableTables';
import AdminBookings from '../pages/Admin/AdminBookings';
import AdminTables from '../pages/Admin/AdminTables';
import MyBookings from '../pages/User/MyBookings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'categories/:categoryId/dishes', element: <Dishes /> },
      { path: 'about', element: <About /> },
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <Login /> },
      { path: '/usersignup', element: <UserSignup/> },
      { path: '/userlogin', element: <UserLogin /> },
    ]
  },
  
  {
    path: '/tables',
    element: <PrivateRoute />,
    children: [
    {
      path: '',
      element: <MainLayout />,
      children: [
        { index: true, element: <AvailableTables /> },
        { path: 'my', element: <MyBookings /> }
      ]
    }
  ]
  },
  {
    path: '/admin',
    element: <AdminRoute />,
    children: [
    {
      path: '',
      element: <AdminLayout />, // 👈 actual layout with navbar/footer
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: 'categories', element: <AdminCategories /> },
        { path: 'categories/:categoryId/dishes', element: <AdminDishesById /> },
        { path: 'dishes', element: <AdminDishes /> },
        { path: 'bookings', element: <AdminBookings /> },
        { path: 'tables', element: <AdminTables /> }
      ]
    }
  ]
  }
]);

export default router;
