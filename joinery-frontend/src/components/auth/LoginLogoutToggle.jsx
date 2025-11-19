import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { IconLogout, IconLogin2 } from '@tabler/icons-react';

import { useMe } from '../../hooks/useMe';
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../hooks/useCart";

const LoginLogoutToggle = ({ showIcon = false, className, onClick }) => {
  const { data: user } = useMe();
  const { logout } = useAuth();
  const { invalidateCart } = useCart();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    invalidateCart();
    navigate('/');
    if (onClick) {
      onClick();
    }
  };

  return user ? (
    <Button
      variant="subtle"
      onClick={handleLogout}
      color="gray"
      className={className}
      justify="space-between"
      rightSection={showIcon ? <IconLogout size={20} /> : null}
    >
      Logout
    </Button>
  ) : (
    <Button
      variant="subtle"
      color="gray"
      component={Link}
      to="/login"
      className={className}
      justify="space-between"
      rightSection={showIcon ? <IconLogin2 size={20} /> : null}
      onClick={onClick}
    >
      Login
    </Button>
  );
}

export default LoginLogoutToggle;