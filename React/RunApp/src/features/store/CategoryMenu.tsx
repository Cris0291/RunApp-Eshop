import {
  Menu,
  Button,
  SimpleGrid,
  Stack,
  Title,
  Container,
  Text,
  Divider,
  Flex,
} from '@mantine/core';

const categories = [
  { category: 'Clothes', subCategories: ['Men', 'Women', 'Kids', 'Handbags'] },
  { category: 'Electronics', subCategories: ['Computers', 'Phones', 'Video Games', 'Cameras'] },
  { category: 'Books', subCategories: ['Horror', 'Fantasy', 'Romance', 'Mistery'] },
  {
    category: 'Home & Garden',
    subCategories: ['Kitchen', 'Yard', 'Workshop Tools', 'Home Improvement'],
  },
  {
    category: 'Jewelry & Watches',
    subCategories: ['Luxury watches', 'Wristwaches', 'Fine Jewelry', 'Others'],
  },
  { category: 'Sports', subCategories: ['Cycling', 'Golf Equipment', 'Outdoors', 'Hunting'] },
  { category: 'Baby', subCategories: ['Baby care', 'Safety', 'Maternity', 'Travel Gear'] },
  {
    category: 'Automotive',
    subCategories: ['Accessories', 'Lights', 'Tires & Wheels', 'Tools and Equipment'],
  },
  { category: 'Toys and Games', subCategories: [' Lego', 'Board Games', 'Warhammer', 'Pokemon'] },
];

function CategoryMenu() {
  const items = categories.map((item) => (
    <Stack style={{ marginTop: 10, padding: 10, marginBottom: 30 }}>
      <Container style={{ display: 'flex' }}>
        <Title order={3} style={{ flex: 1, justifyContent: 'center' }}>
          {item.category}
        </Title>
      </Container>
      <Container fluid>
        <Stack>
          {item.subCategories.map((sub) => (
            <Container style={{ display: 'flex' }}>
              <Text style={{ flex: 1, justifyContent: 'center' }}>{sub}</Text>
            </Container>
          ))}
        </Stack>
      </Container>
    </Stack>
  ));

  return (
    <Menu position="bottom-start" offset={20}>
      <Menu.Target>
        <Button variant="transparent" style={{ marginLeft: -60 }}>
          Shop by category
        </Button>
      </Menu.Target>
      <Menu.Dropdown style={{ position: 'absolute', left: 300 }}>
        <SimpleGrid cols={3} spacing={0}>
          {items}
        </SimpleGrid>
      </Menu.Dropdown>
    </Menu>
  );
}

export default CategoryMenu;
