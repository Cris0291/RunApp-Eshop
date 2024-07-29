import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
  IconSailboat,
} from '@tabler/icons-react';
import classes from './modules/Header.module.css';
import { Link } from 'react-router-dom';

const mockdata = [
  {
    icon: IconCode,
    title: 'Schedule your workout',
    description: 'Never miss another session, get fit the easy way',
  },
  {
    icon: IconCoin,
    title: 'Best services for your money',
    description: 'Great products, great quality, cheap prices',
  },
  {
    icon: IconBook,
    title: 'Best sales',
    description: 'Great prizes, who does not like them!!!',
  },
  {
    icon: IconFingerprint,
    title: 'Add your friends',
    description: 'Feeling lonely, do not fear add your friends to your workouts',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'Check your progress',
  },
  {
    icon: IconNotification,
    title: 'Share your favorites',
    description: 'Like your favorite produsts, share them with your friends',
  },
];

export function NavBar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="filled" radius="md" color="#e779c1">
          <item.icon style={{ width: rem(22), height: rem(22) }} color="#FFFFFF" />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500} c=" #FFFFFF">
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box pb={100}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group>
            <IconSailboat style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
            <Text fw={900} c="#ffffff">
              RunningWorld
            </Text>
          </Group>
          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link} style={{ color: ' #ffffff' }}>
              Home
            </a>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link} style={{ color: ' #ffffff' }}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: 'hidden', backgroundColor: '#201047' }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Organize all your workouts just in one place
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <Link to="/store" className={classes.link} style={{ color: ' #ffffff' }}>
              Shop
            </Link>
            <a href="#" className={classes.link} style={{ color: ' #ffffff' }}>
              Hot Sales
            </a>
          </Group>

          <Group visibleFrom="sm">
            <Button variant="filled" color="#00A1E4">
              Log in
            </Button>
            <Button color="#6B31B2">Sign up</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default NavBar;
