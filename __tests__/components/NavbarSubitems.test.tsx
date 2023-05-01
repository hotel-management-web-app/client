import React from 'react';
import { render, screen } from '@testing-library/react';
import { BsFillGearFill } from 'react-icons/bs';
import '@testing-library/jest-dom';
import NavbarSubitems from '../../components/NavbarSubitems';

describe('NavbarSubitems', () => {
  it('Should render properly', () => {
    const { name, route, icon, sublinks } = navItem;
    render(
      <NavbarSubitems
        icon={icon}
        route={route}
        name={name}
        sublinks={sublinks}
      />
    );

    const navbarSubitemsElement = screen.getByText(name);

    expect(navbarSubitemsElement).toBeInTheDocument();
  });
});

const navItem = {
  name: 'Hotel Configuration',
  route: 'hotel-configuration',
  icon: <BsFillGearFill size={20} className="mr-4" />,
  sublinks: [
    {
      name: 'General settings',
      route: 'general-settings',
    },
    {
      name: 'Room Types',
      route: 'room-types',
    },
    {
      name: 'Rooms',
      route: 'rooms',
    },
    {
      name: 'About settings',
      route: 'about-settings',
    },
  ],
};
