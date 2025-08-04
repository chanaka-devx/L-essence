import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/admin/AdminNavbar';
import Footer from '../components/Footer';

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
