import { useForm } from '@mantine/form';
import { Button, Grid, Drawer, Fieldset} from '@mantine/core';
import { notifications } from "@mantine/notifications";

import { useUpdateResource } from "../../hooks/useResourceMutations.js";
import useResource from "../../hooks/useResource.js";
import FormGridInputs from "../ui/FormGridInputs.jsx";

const storeInfoInputs = [
  { name: 'name', label: 'Store Name', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: false },
  { name: 'location', label: 'Location', type: 'text', required: false },
];

const addressInputs = [
  { name: 'address_attributes.address_1', label:  'Address 1', type: 'text', required: true },
  { name: 'address_attributes.address_2', label: 'Address 2', type: 'text', required: false, gridSize: 6 },
  { name: 'address_attributes.city', label: 'City', type: 'text', required: true, gridSize: 6  },
  { name: 'address_attributes.state', label: 'State', type: 'text', required: true, gridSize: 6  },
  { name: 'address_attributes.zip', label: 'Zip Code', type: 'text', required: true, gridSize: 6  },
];

const EditStoreInfo = ({ storeId, open, onClose }) => {
  const { data: store, isLoading } = useResource('store', storeId);
  const updateStore = useUpdateResource('stores');

  const form = useForm({
    initialValues: {
      name: store ? store.name : '',
      description: store ? store.description : '',
      location: store ? store.location : '',
      address_attributes: store && store.address ? {
        id: store.address.id,
        address_1: store.address.address_1 || '',
        address_2: store.address.address_2 || '',
        city: store.address.city || '',
        state: store.address.state || '',
        zip: store.address.zip || '',
      } : {
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        zip: '',
      },
    },

    validate: {
      name: (value) => (value.length > 0 ? null : 'Store name is required'),
    },
  });

  const handleSubmit = async (values) => {
    try {
      await updateStore.mutateAsync({ id: storeId, ...values });
      notifications.show({
        title: 'Success',
        message: 'Store information updated successfully',
        color: 'green',
        position: "top-right"
      });
      onClose();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update store information',
        color: 'red',
        position: "top-right"
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Drawer opened={open} onClose={onClose} title="Edit Store Information" position="bottom">
      <div className="edit-store-form-container">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid>
              <Grid.Col span={6}>
                <Fieldset legend="Store Information" mb="md">
                  <Grid>
                    <FormGridInputs form={form} formInputs={storeInfoInputs} />
                  </Grid>
                </Fieldset>
              </Grid.Col>

              <Grid.Col span={6}>
                <Fieldset legend="Store Address" mb="md">
                  <Grid>
                    <FormGridInputs form={form} formInputs={addressInputs} />
                  </Grid>
                </Fieldset>
              </Grid.Col>
            </Grid>

            <div className="flex row to-right">
              <Button type="submit" mt="md" w={240} color="teal">
                Update Store Info
              </Button>
            </div>
          </form>
      </div>
    </Drawer>
  );
};

export default EditStoreInfo;