import React from 'react';
import AdminNavbar from './AdminNavbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => (
  <div>
    <AdminNavbar />
    {children}
  </div>
);

export default AdminLayout;
