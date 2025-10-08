import { Link } from 'react-router-dom';
import { Box, Group } from '@mantine/core';

import { useMe } from '../../hooks/useMe.js';
import NavbarCart from '../cart/NavbarCart.jsx';
import LoginLogoutToggle from "../auth/LoginLogoutToggle.jsx";
import './JoineryNavbar.scss';

const JoineryNavbar = () => {
  const { data: user, isLoading, isError, error } = useMe();
  const currentStore = user?.current_store;

  if (isLoading) {
    return
  }

  const createStoreLink = !user ? '/login' : '/stores/new';
  const storeLink = currentStore ? `/stores/${currentStore.id}` : createStoreLink;
  const storeText = currentStore ? currentStore.name : 'Want to sell?';

  return (
    <Box>
      <header className="navbar">
        <Group justify="space-between" h="100%" w="100%" px={20}>
          <Group h="100%" gap={0} visibleFrom="sm">

            <Link to="/" className="navbar-logo">
              <h2 className="margin-none">The Joinery</h2>
            </Link>

            <Link to={storeLink} className="navbar-link" state={{ signup: true }}>
              {storeText}
            </Link>
          </Group>

          <Group h="100%" gap={15}>
            <NavbarCart />
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