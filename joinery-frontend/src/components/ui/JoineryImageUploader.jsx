import { useState, useEffect } from 'react';
import { Group, Text, Button, Card, Image, ActionIcon, Alert, Badge, SimpleGrid } from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconTrash } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

const JoineryImageUploader = ({ resourceId, uploadApi, onSuccessfulUpload }) => {
  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      files.forEach(file => {
        const url = URL.createObjectURL(file);
        URL.revokeObjectURL(url);
      });
    };
  }, [files]);

  const removeSelectedFile = (index) => {
    const fileToRemove = files[index];
    if (fileToRemove) {
      const url = URL.createObjectURL(fileToRemove);
      URL.revokeObjectURL(url);
    }
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleDrop = (newFiles) => {
    setFiles([...files, ...newFiles]);
    setError(null);
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const images = await uploadApi.uploadImages(resourceId, files);

      // Update uploaded images if the API returns image URLs
      if (images.image_urls) {
        setUploadedImages([...uploadedImages, ...images.image_urls]);
      }

      setFiles([]);
      onSuccessfulUpload?.(images);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Upload failed';
      setError('Upload failed: ' + message);
    } finally {
      setUploading(false);
    }
  };

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Card key={index} padding="xs" radius="md" withBorder>
        <Card.Section>
          <Image
            src={imageUrl}
            height={120}
            alt={`Upload preview ${index}`}
          />
        </Card.Section>
        <Group position="apart" mt="sm">
          <Text size="sm" weight={500} truncate>
            {file.name}
          </Text>
          <ActionIcon
            color="red"
            variant="subtle"
            onClick={() => removeSelectedFile(index)}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
        <Text size="xs" color="dimmed">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </Text>
      </Card>
    );
  });

  const uploadedPreviews = uploadedImages.map((image, index) => {
    return (
      <Card key={`uploaded-${index}`} padding="xs" radius="md" withBorder>
        <Card.Section>
          <Image
            src={typeof image === 'string' ? image : image.url}
            height={120}
            alt={`Uploaded image ${index}`}
          />
        </Card.Section>
        <Group position="apart" mt="sm">
          <Badge color="green">Uploaded</Badge>
        </Group>
      </Card>
    );
  });

  return (
    <>
      <Dropzone
        onDrop={handleDrop}
        onReject={(files) => setError(`Rejected files: ${files.map(file => file.name).join(', ')}`)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>

      {error && (
        <Alert color="red" title="Error" withCloseButton onClose={() => setError(null)} mt="md">
          {error}
        </Alert>
      )}

      {uploading && (
        <Alert color="blue" title="Uploading..." mt="md">
          Please wait while your images are being uploaded...
        </Alert>
      )}

      {(previews.length > 0 || uploadedPreviews.length > 0) && (
        <div style={{ marginTop: '1rem' }}>
          {uploadedPreviews.length > 0 && (
            <>
              <Text weight={500} size="sm" mb="xs">
                Current Images:
              </Text>
              <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 2 }]}>
                {uploadedPreviews}
              </SimpleGrid>
            </>
          )}

          {previews.length > 0 && (
            <>
              <Text weight={500} size="sm" mb="xs" mt="md">
                Selected Files:
              </Text>
              <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 2 }]}>
                {previews}
              </SimpleGrid>
            </>
          )}
        </div>
      )}

      {files.length > 0 && (
        <div className="flex row">
          <Group position="right" mt="md">
            <Button
              onClick={() => setFiles([])}
              variant="subtle"
              color="gray"
              disabled={uploading}
              className="action-button"
            >
              Clear
            </Button>
            <Button
              onClick={handleUpload}
              disabled={uploading || files.length === 0}
              loading={uploading}
              color="violet"
              className="action-button"
            >
              Upload
            </Button>
          </Group>
        </div>
      )}
    </>
  );
};

export default JoineryImageUploader;