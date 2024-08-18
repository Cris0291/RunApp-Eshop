import { Card, Overlay, Button, Text, BackgroundImage } from '@mantine/core';
import classes from './banner.module.css';

interface BannerProps {
  image: string;
}

export function Banner({ image }: BannerProps) {
  return (
    <Card radius="md" className={classes.card} style={{ backgroundImage: `url(${image})` }}>
      <Overlay className={classes.overlay} opacity={0.55} zIndex={0} />

      <div className={classes.content}>
        <Text size="lg" fw={700} className={classes.title}>
          Plan & save
        </Text>

        <Text size="sm" className={classes.description}>
          Save up to 25% at Fifth Season Hotels in Europe, the Middle East, Africa and Asia Pacific
        </Text>

        <Button className={classes.action} variant="white" color="dark" size="xs">
          Book now
        </Button>
      </div>
    </Card>
  );
}

export default Banner;
