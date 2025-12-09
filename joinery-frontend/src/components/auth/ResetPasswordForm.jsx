import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { TextInput, Button, Card, Text } from '@mantine/core';
import { authService } from '../../services/authService.js';
import { notifications } from '@mantine/notifications';

const ResetPasswordForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      password: '',
      password_confirmation: '',
    },
    validate: {
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters long'),
      password_confirmation: (value, values) =>
        value === values.password ? null : 'Passwords do not match',
    },
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      await authService.resetPassword(token, values.password, values.password_confirmation);
      notifications.show({
        title: 'Success',
        message: 'Your password has been reset successfully.',
        color: 'green',
      });
      navigate('/products');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to reset password. Please try again later.',
        color: 'red',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="center-content column">
      <div className="login-form-container">
        <Card shadow="sm" padding="lg" radius="md" withBorder className="login-signup-form">
          <Text size="lg" weight={500}>
            Reset Your Password
          </Text>

          <Text size="sm" color="dimmed" mb="lg">
            Enter your new password below.
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="New Password"
              placeholder="Enter your new password"
              type="password"
              {...form.getInputProps('password')}
              className="margin-bottom"
            />
            <TextInput
              label="Confirm New Password"
              placeholder="Confirm your new password"
              type="password"
              {...form.getInputProps('password_confirmation')}
              className="margin-bottom"
            />
            <Button type="submit" fullWidth className="double-margin-top" disabled={isSubmitting} loading={isSubmitting}>
              Reset Password
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default ResetPasswordForm;

