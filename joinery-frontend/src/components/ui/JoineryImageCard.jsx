import { Card, Image, Text, Button, Group } from '@mantine/core';

const JoineryImageCard = ({ image, title, body, actionButton}) => {
  const { url, alt } = image;
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={url}
          height={160}
          alt={alt}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
      </Group>

      <Text size="sm" c="dimmed">
        {body}
      </Text>

      {actionButton && <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={actionButton.onClick}>
        {actionButton.displayText}
      </Button>}
    </Card>
  );
}

export default JoineryImageCard;