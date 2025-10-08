import { Text, Button, Drawer } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { IconShoppingBag } from '@tabler/icons-react';

import Cart from './Cart.jsx';
import { useCart } from '../../hooks/useCart.js';


const NavbarCart = () => {
  const { cart } = useCart();
  console.log('cart in NavbarCart:', cart);
  const itemCount = cart?.cart_items?.length || 0;
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button variant="subtle" color="black" onClick={open}>
        <div className="center-content">
          <IconShoppingBag size={20} className="margin-right" />
          <Text size="sm">cart {itemCount > 0 && <span className="cart-count">{itemCount}</span>}</Text>
        </div>
      </Button>

      <Drawer opened={opened} onClose={close} title="Your Cart" position="right">
        <Cart closeModal={close} />
      </Drawer>
    </>
  );
}

export default NavbarCart;