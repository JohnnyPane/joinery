import { useNavigate } from "react-router-dom";
import { useForm } from '@mantine/form';
import { TextInput, Button, Textarea, Card, Text } from '@mantine/core';

import { createApi } from "../../services/createApi.js";

const storeApi = createApi('store');

const StoreForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      location: '',
    },

    validate: {
      name: (value) => (value.length > 0 ? null : 'Store name is required'),
    },
  });

  const handleSubmit = async (values) => {
    try {
      const store = await storeApi.create(values);
      navigate('/stores/' + store.id);
    } catch (error) {
      console.error('Store creation failed:', error);
    }
  };

  return (
    <div className="center-content">
      <div className="login-form-container">
        <Card shadow="sm" padding="lg" radius="md" withBorder className="store-form">
          <Text size="lg" weight={500}>
            Create a New Store
          </Text>
          <Text size="sm" color="dimmed" mb="lg">
            Fill out the form below to create your store.
          </Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Store Name"
              placeholder="Enter your store name"
              {...form.getInputProps('name')}
              className="double-margin-bottom"
            />
            <Text size="sm" fw={500}>
              Description
            </Text>
            <Text size="sm" color="dimmed" mb="xs">
              Use this space to highlight your background, what you create, and what sets your shop apart. A good description helps buyers understand your values and makes your store standout.
            </Text>
            <Textarea
              placeholder="Enter a description of your store"
              {...form.getInputProps('description')}
              className="margin-bottom"
            />
            <TextInput
              label="Location"
              placeholder="Enter your store location"
              {...form.getInputProps('location')}
              className="double-margin-bottom"
            />
            <div className="flex to-right full-width double-margin-top">
              <Button type="submit" className="full-width margin-40-t" color="teal">Create Store</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default StoreForm;
