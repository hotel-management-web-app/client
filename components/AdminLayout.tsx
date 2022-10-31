import React from 'react';
import AdminNavbar from './AdminNavbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => (
  <div className="bg-[#F3F5F7] h-screen">
    <AdminNavbar />
    <div className="md:pl-64 flex flex-col flex-1">
      <div className="px-5 mt-10">{children}</div>
    </div>
  </div>
);

export default AdminLayout;
