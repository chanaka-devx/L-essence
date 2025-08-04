import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Dishes from '../pages/Dishes/Dishes';
import About from '../pages/About/About';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import AdminCategories from '../pages/Admin/AdminCategories';
import AdminDashboard from '../pages/Admin/AdminDashboard';

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
      // Placeholder routes for future admin pages
      {
        path: 'dishes',
        element: <div className="p-10 text-center">Admin Dishes Page - Coming Soon</div>
      },
      {
        path: 'bookings',
        element: <div className="p-10 text-center">Admin Bookings Page - Coming Soon</div>
      }
    ]
  }
]);

export default router;
