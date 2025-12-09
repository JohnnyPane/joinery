import { useForm } from '@mantine/form';
import { TextInput, Button, Card, Text } from '@mantine/core';
import { authService } from '../../services/authService.js';
import { notifications } from '@mantine/notifications';

const RequestPasswordReset = ({ toggleForm }) => {
  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = async (values) => {
    try {
      await authService.requestPasswordReset(values.email);
      notifications.show({
        title: 'Success',
        message: 'Password reset instructions have been sent to your email.',
        color: 'green',
      });
      toggleForm();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to send password reset instructions. Please try again later.',
        color: 'red',
      });
    }
  };

  return (
    <div className="login-form-container">
      <Card shadow="sm" padding="lg" radius="md" withBorder className="login-signup-form">
        <Text size="lg" weight={500}>
          Reset Your Password
        </Text>

        <Text size="sm" color="dimmed" mb="lg">
          Enter your email address to receive password reset instructions.
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            {...form.getInputProps('email')}
            className="margin-bottom"
          />
          <Button type="submit" fullWidth className="double-margin-top">
            Send Reset Instructions
          </Button>
        </form>
        <Button variant="subtle" color="gray" onClick={toggleForm} fullWidth className="margin-top">
          Back to Login
        </Button>
      </Card>
    </div>
  );
}

export default RequestPasswordReset;