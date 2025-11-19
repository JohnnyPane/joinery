import { useQueryClient } from '@tanstack/react-query';import { Drawer } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import JoineryImageUploader from "../ui/JoineryImageUploader.jsx";
import { createApi } from "../../services/createApi.js";

const storesApi = createApi('stores');

const AddLogoDrawer = ({ storeId, isOpen, onClose }) => {
  const queryClient = useQueryClient();

  const handleSuccessfulUpload = async (updatedStore) => {
    queryClient.setQueryData(['stores', storeId], updatedStore);

    notifications.show({
      title: 'Success',
      message: 'Logo uploaded successfully',
      color: 'green',
      position: "top-right"
    });
    onClose();
  };

  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      title="Upload Store Logo"
      padding="md"
      size="lg"
      position="right"
    >
      <JoineryImageUploader
        resourceId={storeId}
        uploadApi={storesApi}
        onSuccessfulUpload={handleSuccessfulUpload}
      />
    </Drawer>
  );
}

export default AddLogoDrawer;