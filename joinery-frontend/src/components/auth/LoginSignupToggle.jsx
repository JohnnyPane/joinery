import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Button } from '@mantine/core';
import LoginForm from "./LoginForm.jsx";
import SignupForm from "./SignupForm.jsx";
import './Auth.scss';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    if (state && state.signup) {
      setIsLogin(false);
    }
  }, []);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="center-content column">
      {isLogin ? (<LoginForm />) : (<SignupForm />)}
      <Button onClick={toggleForm} variant="subtle">
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
      </Button>
    </div>
  )
}

export default LoginSignup;