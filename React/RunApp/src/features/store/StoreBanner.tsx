import { Text, Title, TextInput, Button, Image } from '@mantine/core';
import image from './image.svg';
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
        <Button className={classes.control}>{Buttontext}</Button>
      </div>
    </div>
  );
}

export default StoreBanner;
//Wait a minute...
