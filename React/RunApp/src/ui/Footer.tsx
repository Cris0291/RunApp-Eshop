import { Container, Group, Anchor, Text, rem, BackgroundImage } from '@mantine/core';
import { IconSailboat } from '@tabler/icons-react';
import classes from './modules/Footer.module.css';

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Careers' },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor<'a'>
      c="#ffffff"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group>
          <IconSailboat style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
          <Text fw={900} c="#ffffff">
            RunningWorld
          </Text>
        </Group>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}

export default Footer;
