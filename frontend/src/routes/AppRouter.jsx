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

// You can add more routes as needed
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'dishes',
        element: <Dishes />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: 'categories',
        element: <AdminCategories />
      },
      {
        path: 'categories/:categoryId/dishes',
        element: <AdminDishesById />
      },
      {
        path: 'dishes',
        element: <AdminDishes />
      },
      {
        path: 'bookings',
        element: <div className="p-10 text-center">Admin Bookings Page - Coming Soon</div>
      }
    ]
  }
]);

export default router;
