import {
  Title,
  SimpleGrid,
  Text,
  Button,
  ThemeIcon,
  Grid,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { IconReceiptOff, IconFlame, IconCircleDotted, IconFileCode } from '@tabler/icons-react';
import classes from './modules/Main.module.css';

const features = [
  {
    icon: IconReceiptOff,
    title: 'Best services for your money',
    description: 'Great products, great quality, cheap prices',
  },
  {
    icon: IconFileCode,
    title: 'Schedule your workout',
    description: 'Never miss another session, get fit the easy way',
  },
  {
    icon: IconCircleDotted,
    title: 'Add your friends',
    description: 'Feeling lonely, do not fear add your friends to your workouts',
  },
  {
    icon: IconFlame,
    title: 'Best sales',
    description: 'Great prizes, who does not like them!!!',
  },
];

export function Main() {
  const theme = useMantineTheme();
  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon size={44} radius="md" variant="filled" color="#e779c1">
        <feature.icon style={{ width: rem(26), height: rem(26) }} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500} c="#ffffff">
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <div className={classes.wrapper}>
      <Grid gutter={80}>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Title className={classes.title} order={2} style={{ color: ' #71ead2' }}>
            A fully featured workout management app with its own shop included
          </Title>
          <Text c="#ffffff">
            Create routines schedule them choose the duration of your exercises and share them with
            your friends. When you feel like taking a break visit our store
          </Text>

          <Button variant="filled" size="lg" radius="md" mt="xl" color="#e779c1">
            Get started
          </Button>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
            {items}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default Main;
