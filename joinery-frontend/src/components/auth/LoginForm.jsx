import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Card, Text } from '@mantine/core';

import RequestPasswordReset from "./RequestPasswordReset.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const LoginForm = () => {
  const [forgotPassword, setForgetPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters long'),
    },
  });

  const handleSubmit = async (values) => {
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const toggleForgotPassword = () => {
    setForgetPassword(!forgotPassword);
  }

  if (forgotPassword) {
    return (
      <RequestPasswordReset toggleForm={toggleForgotPassword} />
    );
  }

  return (
    <div className="login-form-container">
      <Card shadow="sm" padding="lg" radius="md" withBorder className="login-signup-form">
        <Text size="lg" weight={500}>
          Welcome back!
        </Text>
        <Text size="sm" color="dimmed" mb="lg">
          Please log in to your account.
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            {...form.getInputProps('email')}
            className="margin-bottom"
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            {...form.getInputProps('password')}
            className="margin-bottom"
          />
          <div className="flex to-right full-width">
            <Button type="submit" color="teal" className="full-width double-margin-top">Log In</Button>
          </div>

          <Button variant="subtle" color="gray" onClick={toggleForgotPassword} className="full-width margin-top">
            Forgot Your Password?
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default LoginForm;