import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Box, Group, Stack, Button, Text, Indicator, Burger, Drawer, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';

import { useMe } from '../../hooks/useMe.js';
import NavbarCart from '../cart/NavbarCart.jsx';
import LoginLogoutToggle from "../auth/LoginLogoutToggle.jsx";
import './JoineryNavbar.scss';

const JoineryNavbar = () => {
  const { data: user, isLoading, isError, error } = useMe();
  const currentStore = user?.current_store;
  const [processing, setProcessing] = useState(false);
  const [drawerOpened, { open, close }] = useDisclosure(false)

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

          <Link to="/" className="navbar-logo">
            <h2 className="margin-none">The Joinery</h2>
          </Link>

          <Group gap={15} visibleFrom="md">
            {user && (
              <Indicator inline size={16} offset={10} color="teal" processing={processing}
                         withBorder
                         disabled={!user || user?.quotes_awaiting_action_count === 0}
              >
                <Button component={Link} to="/quotes" variant="subtle" color="gray">
                  <Text color="black" size="sm">Quotes</Text>
                </Button>
              </Indicator>
            )}

            <Button component={Link} to="/products" variant="subtle" color="gray">
              <Text color="black" size="sm">Products</Text>
            </Button>

            <Button component={Link} to={storeLink} state={{ storeSignup: true }} variant="subtle" color="gray">
              <Text color="black" size="sm">{storeText}</Text>
            </Button>

            {currentStore && (
              <Indicator inline size={16} offset={10} color="teal" processing={processing}
                         withBorder
                         disabled={!user || !user?.has_orders_awaiting_action}
              >
                <Button component={Link} to="/orders" variant="subtle" color="gray">
                  <Text color="black" size="sm">Orders</Text>
                </Button>
              </Indicator>
            )}

            <NavbarCart />

            <LoginLogoutToggle />
          </Group>

          <Group hiddenFrom="md">
            <NavbarCart />

            <Indicator inline size={16} offset={4} color="teal" processing={processing}
                       withBorder
                       disabled={!user || !user?.has_orders_awaiting_action || user?.quotes_awaiting_action_count === 0}
            >
              <Burger
                opened={drawerOpened}
                onClick={open}
              />
            </Indicator>
          </Group>

        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={close}
        padding="md"
        size="sm"
        title={user && <Text>Hello, {user.name}</Text>}
        styles={{
          body: {
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }
        }}
      >
        <Stack gap="md" align="flex-start">
          {user && (
            <Button
              component={Link}
              to="/quotes"
              variant="subtle"
              className="full-width"
              onClick={close}
              color="gray"
              justify="space-between"
              rightSection={<IconChevronRight size={20} />}
            >
              <Indicator
                size={16}
                offset={6}
                processing={processing}
                withBorder
                disabled={!user || user?.quotes_awaiting_action_count === 0}
              >
                <Text style={{ paddingRight: "16px" }} color="black" size="sm">Quotes</Text>
              </Indicator>
            </Button>
          )}

          <Button
            component={Link}
            to="/products"
            variant="subtle"
            className="full-width"
            onClick={close}
            color="gray"
            justify="space-between"
            rightSection={<IconChevronRight size={20} />}
          >
            <Text color="black" size="sm">Products</Text>
          </Button>

          <Button
            component={Link}
            to={storeLink}
            state={{ storeSignup: true }}
            variant="subtle"
            className="full-width"
            onClick={close}
            color="gray"
            justify="space-between"
            rightSection={<IconChevronRight size={20} />}
          >
            <Text color="black" size="sm">{storeText}</Text>
          </Button>

          {currentStore && (
            <Button
              component={Link}
              to="/orders"
              variant="subtle"
              className="full-width"
              onClick={close}
              color="gray"
              justify="space-between"
              rightSection={<IconChevronRight size={20} />}
            >
              <Indicator
                size={16}
                offset={6}
                processing={processing}
                withBorder
                disabled={!user || !user?.has_orders_awaiting_action}
              >
                <Text style={{ paddingRight: "16px" }} color="black" size="sm">Orders</Text>
              </Indicator>
            </Button>
          )}
        </Stack>


        <div className="margin-t-80">
          <Divider className="double-margin-bottom" />

          <LoginLogoutToggle className="full-width space-between" showIcon={true} onClick={close} />
        </div>
      </Drawer>
    </Box>
  );
}

export default JoineryNavbar;