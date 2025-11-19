import { Container, Grid, Title, Text, Button, Image, Card, Group, SimpleGrid } from '@mantine/core';

const makers = [
];

const AboutUs = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ backgroundColor: '#f0f0f0', padding: '6rem 0', textAlign: 'center' }}>
        <Title order={1} mb="md">Craft Meets Connection</Title>
        <Text size="lg" mb="xl">
          Joinery brings together skilled woodworkers and passionate buyers, celebrating craftsmanship and the story behind every piece.
        </Text>
        <Button variant="filled" color="green" size="md">Browse Products</Button>
      </section>

      <Container py="6rem">
        <Grid gutter="xl" align="center">
          <Grid.Col xs={12} md={6}>
            <Image src="/images/story.jpg" alt="Woodworking workshop" radius="md" />
          </Grid.Col>
          <Grid.Col xs={12} md={6}>
            <Title order={2} mb="md">Our Story</Title>

          </Grid.Col>
        </Grid>
      </Container>

      <Container py="6rem">
        <Title order={2} mb="xl" align="center">Meet the Team</Title>
        <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'md', cols: 2 }, { maxWidth: 'sm', cols: 1 }]} spacing="xl">
          {makers.map((maker) => (
            <Card key={maker.name} shadow="sm" padding="lg" radius="md">
              <Card.Section>
                <Image src={maker.img} alt={maker.name} height={200} />
              </Card.Section>
              <Text weight={500} mt="md">{maker.name}</Text>
              <Text size="sm" color="dimmed">{maker.craft}</Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      <section style={{ backgroundColor: '#f8f8f8', padding: '6rem 0', textAlign: 'center' }}>
        <Title order={2} mb="md">How It Works</Title>
        <Grid gutter="xl" justify="center">
          <Grid.Col xs={12} md={4} style={{ textAlign: 'center' }}>
            <Text weight={500} mb="sm">Discover</Text>
            <Text size="sm">Browse unique woodworking products from artisans across the country.</Text>
          </Grid.Col>
          <Grid.Col xs={12} md={4} style={{ textAlign: 'center' }}>
            <Text weight={500} mb="sm">Connect</Text>
            <Text size="sm">Reach out to makers directly to learn about their process and craft.</Text>
          </Grid.Col>
          <Grid.Col xs={12} md={4} style={{ textAlign: 'center' }}>
            <Text weight={500} mb="sm">Support</Text>
            <Text size="sm">Purchase products and support sustainable, authentic craftsmanship.</Text>
          </Grid.Col>
        </Grid>
        <Button mt="xl" variant="filled" color="green" size="md">Become a Seller</Button>
      </section>
    </div>
  );
}

export default AboutUs;
