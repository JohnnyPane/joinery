import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Box, Group, Button, Text, Indicator } from '@mantine/core';

import { useMe } from '../../hooks/useMe.js';
import NavbarCart from '../cart/NavbarCart.jsx';
import LoginLogoutToggle from "../auth/LoginLogoutToggle.jsx";
import './JoineryNavbar.scss';

const JoineryNavbar = () => {
  const { data: user, isLoading, isError, error } = useMe();
  const currentStore = user?.current_store;
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setProcessing(true);
    const timer = setTimeout(() => setProcessing(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const createStoreLink = !user ? '/login' : '/stores/new';
  const storeLink = currentStore ? `/stores/${currentStore.id}` : createStoreLink;
  const storeText = currentStore ? currentStore.name : 'Want to sell?';

  return (
    <Box>
      <header className="joinery-navbar">
        <Group justify="space-between" h="100%" w="100%" px={20}>
          <Group h="100%" gap={0} visibleFrom="sm">

            <Link to="/" className="navbar-logo">
              <h2 className="margin-none">The Joinery</h2>
            </Link>
          </Group>

          <Group h="100%" gap={15}>
            {user &&
              <Indicator inline size={16} offset={10} color="teal" processing={processing} withBorder disabled={!user || user?.quotes_awaiting_action_count === 0}>
              <Button component={Link} to="/quotes" variant="subtle" color="gray">
                <Text color="black" size="sm">Quotes</Text>
              </Button>
            </Indicator>}


            <Button component={Link} to="/products" variant="subtle" color="gray">
              <Text color="black" size="sm">Products</Text>
            </Button>

            <Button component={Link} to={storeLink} state={{ storeSignup: true }} variant="subtle" color="gray">
              <Text color="black" size="sm">{storeText}</Text>
            </Button>

            {currentStore && (
              <Indicator inline size={16} offset={10} color="teal" processing={processing} withBorder disabled={!user || !user?.has_orders_awaiting_action}>
                <Button component={Link} to={`/orders`} variant="subtle" color="gray">
                  <Text color="black" size="sm">Orders</Text>
                </Button>
              </Indicator>
            )}

            <NavbarCart />
            {user && <h5>Hello, {user.name}</h5>}
            <LoginLogoutToggle />
          </Group>
        </Group>
      </header>
    </Box>
  );
}

export default JoineryNavbar;