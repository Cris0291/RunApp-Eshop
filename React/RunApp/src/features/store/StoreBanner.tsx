import { Text, Title, Button } from '@mantine/core';
import classes from './storeBanner.module.css';

interface StoreBannerProps {
  MainTitle: string | null;
  Subtitle: string | null;
  Body: string | null;
  Buttontext: string | null;
  width: number | undefined;
  margin: number | undefined;
  color: string | undefined;
  height: number | undefined;
}

export function StoreBanner({
  MainTitle,
  Subtitle,
  Body,
  Buttontext,
  width,
  margin,
  color,
  height,
}: StoreBannerProps) {
  return (
    <div
      className={classes.wrapper}
      style={{
        backgroundColor: color,
        marginTop: margin,
        width: `${width}%`,
        justifyContent: 'space-around',
        height: `${height}px`,
      }}
    >
      <div className={classes.body}>
        <Title className={classes.title}>{MainTitle}</Title>
        <Text fw={500} fz="lg" mb={5}>
          {Subtitle}
        </Text>
        <Text fz="sm" c="dimmed">
          {Body}
        </Text>
      </div>
      <div className={classes.controls}>
        <Button variant="white" color="black" size="lg" className={classes.control}>
          {Buttontext}
        </Button>
        <Button variant="outline" color="#d7ab61" size="lg" className={classes.control}>
          {Buttontext}
        </Button>
      </div>
    </div>
  );
}

export default StoreBanner;
//Wait a minute...
