import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <h1 className="text-2xl">{title}</h1>
);

export default Header;
