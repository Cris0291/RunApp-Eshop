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
import { IconHeart, IconBookmark, IconShare } from '@tabler/icons-react';
import classes from './simpleProductCard.module.css';

export function SimpleProductCard() {
  const theme = useMantineTheme();

  return (
    <Card padding="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image
          src="https://m.media-amazon.com/images/I/81XVpnuaxIL._AC_SX425_.jpg"
          alt="Top 50 underrated plants for house decoration"
          height={250}
        />
      </Card.Section>

      <Badge w="fit-content" variant="light">
        decorations
      </Badge>

      <Text c="blue" fw={500} className={classes.title} mt="xs">
        Top 50 underrated plants for house decoration
      </Text>
      <Rating />

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Group gap={0}>
            <ActionIcon variant="subtle" color="gray">
              <IconHeart
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconBookmark
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
