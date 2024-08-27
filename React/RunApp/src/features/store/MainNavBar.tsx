import { Group, rem, TextInput } from '@mantine/core';
import { IconSailboat, IconSearch } from '@tabler/icons-react';
import classes from './mainNavBar.module.css';
import CategoryMenu from './CategoryMenu';

function MainNavBar() {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group style={{ flex: 1, justifyContent: 'center' }}>
          <CategoryMenu />
          <TextInput
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            visibleFrom="xs"
            radius="xl"
            size="md"
            classNames={{ input: classes.input }}
          />
        </Group>
      </div>
    </header>
  );
}

export default MainNavBar;
