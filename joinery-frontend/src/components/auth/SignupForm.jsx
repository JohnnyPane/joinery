import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button, Text, Card, Alert } from "@mantine/core";

import { useAuth } from "../../context/AuthContext.jsx";

const SignupForm = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },

    validate: {
      firstName: (value) => (value.trim() ? null : "First name is required"),
      lastName: (value) => (value.trim() ? null : "Last name is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => value.length >= 6 ? null : "Password must be at least 6 characters long",
      passwordConfirm: (value, values) => value === values.password ? null : "Passwords do not match",
    },
  });

  const handleSubmit = async (values) => {
    try {
      await signup(values.firstName, values.lastName, values.email, values.password, values.passwordConfirm);
      navigate("/products");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="login-signup-form">
      <Text size="lg" weight={500}>
        Create an account
      </Text>
      <Text size="sm" color="dimmed" mb="lg">
        Sign up to access exclusive features and offers.
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="First Name"
          placeholder="Enter your first name"
          {...form.getInputProps("firstName")}
        />
        <TextInput
          label="Last Name"
          placeholder="Enter your last name"
          {...form.getInputProps("lastName")}
        />
        <TextInput
          label="Email"
          placeholder="Enter your email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          {...form.getInputProps("password")}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          {...form.getInputProps("passwordConfirm")}
        />
        <div>
          <Button type="submit" className="full-width margin-40-t">Sign Up</Button>
        </div>
      </form>
    </Card>
  );
}

export default SignupForm;