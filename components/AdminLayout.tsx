import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from './AdminNavbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => (
  <div className="bg-[#F3F5F7] h-full min-h-screen">
    <AdminNavbar />
    <div className="md:pl-64 flex flex-col flex-1">
      <div className="px-5 mt-10">{children}</div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  </div>
);

export default AdminLayout;
