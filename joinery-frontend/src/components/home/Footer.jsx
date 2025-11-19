import { Container, Grid, Text, Title, Anchor, Group, Divider } from '@mantine/core';


const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f8f8f8', paddingTop: '3rem', paddingBottom: '3rem' }}>
      <Container>
        <Grid>
          <Grid.Col span={3}>
            <Title order={4}>Joinery</Title>
            <Text size="sm" mt="xs">
              Connecting woodworkers and buyers through authentic craftsmanship and sustainably sourced materials.
            </Text>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text weight={500} mb="xs">Shop</Text>
            <Anchor color="black" href="/products" size="sm">All Products</Anchor><br />
            <Anchor href="/products/categories/raw_materials" size="sm">Lumber</Anchor><br />
            <Anchor href="/products/categories/lumber" size="sm">Tools</Anchor><br />
            <Anchor href="/products/categories/finished_goods" size="sm">Finished Goods</Anchor>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text weight={500} mb="xs">Support</Text>
            <Anchor href="/about" size="sm">About Us</Anchor><br />
            <Anchor href="/contact" size="sm">Contact</Anchor><br />
            <Anchor href="/faq" size="sm">FAQ</Anchor><br />
            <Anchor href="/policies" size="sm">Terms & Privacy</Anchor>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text weight={500} mb="xs">Connect</Text>
            <Group spacing="xs" mt="xs">
              <Anchor href="https://instagram.com" size="sm">Instagram</Anchor>
              <Anchor href="https://youtube.com" size="sm">YouTube</Anchor>
            </Group>
            <Text size="sm" mt="md">
              © 2025 Joinery
            </Text>
          </Grid.Col>
        </Grid>
        <Divider mt="xl" />
      </Container>
    </footer>
  );
}

export default Footer;