import {
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Rating,
  Badge,
  useMantineTheme,
  rem,
} from '@mantine/core';
import { IconHeartFilled, IconBookmarkFilled } from '@tabler/icons-react';
import classes from './simpleProductCard.module.css';

export function SimpleProductCard() {
  const theme = useMantineTheme();

  return (
    <Card padding="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image
          src="https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Top 50 underrated plants for house decoration"
          style={{ objectFit: 'fill' }}
        />
      </Card.Section>

      <Badge w="fit-content" variant="light">
        decorations
      </Badge>
      <Card.Section>
        <Text c="blue" fw={500} className={classes.title} mt="xs">
          Top 50 underrated plants for house decoration
        </Text>
        <Rating />
        <Text fw={700} c="black">
          $ 174.5
        </Text>
      </Card.Section>
      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Group gap={0}>
            <ActionIcon variant="subtle" color="gray">
              <IconHeartFilled
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconBookmarkFilled
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.yellow[6]}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}

export default SimpleProductCard;
