import { Link } from 'react-router-dom';
import { Box, Group } from '@mantine/core';

import { useMe } from '../../hooks/useMe.js';
import LoginLogoutToggle from "../auth/LoginLogoutToggle.jsx";
import './JoineryNavbar.scss';

const JoineryNavbar = () => {
  const { data: user, isLoading, isError, error } = useMe();
  const currentStore = user?.current_store;

  if (isLoading) {
    return
  }

  return (
    <Box>
      <header className="navbar">
        <Group justify="space-between" h="100%" w="100%" px={20}>
          <Group h="100%" gap={0} visibleFrom="sm">

            <h2>The Joinery</h2>

            <Link to="/" className="navbar-link">
              Home
            </Link>
            {user && <Link to="/products" className="navbar-link">
              Products
            </Link>}
            {currentStore && <Link to={`/stores/${currentStore.id}`} className="navbar-link">
              {currentStore.name}
            </Link>}
          </Group>

          <Group visibleFrom="sm">
            {user && <h5>Hello, {user.name}</h5>}
            <LoginLogoutToggle />
          </Group>
        </Group>
      </header>
    </Box>
  );
}

export default JoineryNavbar;