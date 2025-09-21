import { useForm } from '@mantine/form';
import { TextInput, Button, Textarea, Card, Text } from '@mantine/core';

import { createApi } from "../../services/createApi.js";

const storeApi = createApi('store');

const StoreForm = () => {
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
      await storeApi.create(values);
      alert('Store created successfully!');
      // Optionally, redirect or show a success message
    } catch (error) {
      console.error('Store creation failed:', error);
    }
  };

  return (
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
          className="margin-bottom"
        />
        <Textarea
          label="Description"
          placeholder="Enter a brief description of your store"
          {...form.getInputProps('description')}
          className="margin-bottom"
        />
        <TextInput
          label="Location"
          placeholder="Enter your store location"
          {...form.getInputProps('location')}
          className="margin-bottom"
        />
        <div className="flex to-right full-width">
          <Button type="submit" className="full-width margin-40-t">Create Store</Button>
        </div>
      </form>
    </Card>
  );
}

export default StoreForm;
