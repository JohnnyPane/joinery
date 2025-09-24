import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';

import { useMe } from '../../hooks/useMe';
import { useAuth } from "../../context/AuthContext.jsx";

const LoginLogoutToggle = () => {
  const { data: user } = useMe();
  const { logout } = useAuth();


  return user ? (
    <Button variant="outline" onClick={logout}>
      Logout
    </Button>
  ) : (
    <Button variant="outline" component={Link} to="/login">
      Login
    </Button>
  );
}

export default LoginLogoutToggle;