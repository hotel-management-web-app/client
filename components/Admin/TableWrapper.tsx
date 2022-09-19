import React from 'react';

interface TableWrapperProps {
  children: React.ReactNode;
}

const TableWrapper: React.FC<TableWrapperProps> = ({ children }) => (
  <div className="bg-white px-5 py-7 mt-8 rounded-lg">{children}</div>
);

export default TableWrapper;
