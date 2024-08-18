import { Group, rem, ActionIcon, Button } from '@mantine/core';

import {
  IconUser,
  IconSailboat,
  IconShoppingCartSearch,
  IconStretching,
  IconHistory,
} from '@tabler/icons-react';
import classes from './storeNavBar.module.css';

const links = [
  {
    link: '/about',
    label: 'Features',
    Icon: <IconUser />,
  },
  { link: '/pricing', label: 'Pricing', Icon: <IconShoppingCartSearch /> },
  { link: '/learn', label: 'Learn', Icon: <IconHistory /> },
  { link: '/community', label: 'Community', Icon: <IconStretching /> },
];

const signUpItems = [
  { link: '/signup', label: 'signup' },
  { link: '/register', label: 'register' },
];
export function StoreNavBar() {
  const items = links.map((link) => (
    <ActionIcon
      key={link.label}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
      size="lg"
      variant="outline"
    >
      {link.Icon}
    </ActionIcon>
  ));

  const signItems = signUpItems.map((link) => (
    <Button
      key={link.label}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
      variant="light"
    >
      {link.label}
    </Button>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group ml={10} gap={50} className={classes.links} visibleFrom="sm">
          <IconSailboat style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
          <Group>{signItems}</Group>
        </Group>

        <Group ml={200} gap={20} className={classes.links} visibleFrom="sm">
          {items}
        </Group>
      </div>
    </header>
  );
}
export default StoreNavBar;
