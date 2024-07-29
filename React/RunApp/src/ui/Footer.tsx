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
      <BackgroundImage
        src="https://as1.ftcdn.net/v2/jpg/07/30/40/04/1000_F_730400411_hGXU0n5Y1kemeIBp4CVnbPBDKZFZ5Shx.jpg"
        radius="md"
      >
        <Container className={classes.inner}>
          <Group>
            <IconSailboat style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
            <Text fw={900} c="#ffffff">
              RunningWorld
            </Text>
          </Group>
          <Group className={classes.links}>{items}</Group>
        </Container>
      </BackgroundImage>
    </div>
  );
}

export default Footer;
