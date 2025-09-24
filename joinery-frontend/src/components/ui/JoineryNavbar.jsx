import { Link } from 'react-router-dom';
import { Box, Group } from '@mantine/core';

import { useMe } from '../../hooks/useMe.js';
import LoginLogoutToggle from "../auth/LoginLogoutToggle.jsx";
import './JoineryNavbar.scss';

const JoineryNavbar = () => {
  const { data: user, isLoading, isError, error } = useMe();

  return (
    <Box>
      <header className="navbar">
        <Group justify="space-between" h="100%" w="100%" px={20}>
          <Group h="100%" gap={0} visibleFrom="sm">

            <h2>The Joinery</h2>

            <Link to="/home" className="navbar-link">
              Home
            </Link>
            <Link to="/products" className="navbar-link">
              Products
            </Link>
            <Link to="/store" className="navbar-link">
              My Store
            </Link>
          </Group>

          <Group visibleFrom="sm">
            <h5>Hello, {user.name}</h5>
            <LoginLogoutToggle />
          </Group>
        </Group>
      </header>
    </Box>
  );
}

export default JoineryNavbar;