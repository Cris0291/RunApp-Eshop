import {
  IconEye,
  IconMessageCircle,
  IconHeartFilled,
  IconBookmarkFilled,
} from '@tabler/icons-react';
import { Card, Text, Group, Center, rem, useMantineTheme, Rating, ActionIcon } from '@mantine/core';
import classes from './productCard.module.css';

export function ProductCard() {
  const theme = useMantineTheme();

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="a"
      href="https://mantine.dev/"
      target="_blank"
    >
      <div
        className={classes.image}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} fw={500}>
            Journey to Swiss Alps
          </Text>

          <Group justify="space-between" gap="xs">
            <Rating />

            <Group gap="lg">
              <Center>
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
              </Center>
            </Group>
          </Group>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;
