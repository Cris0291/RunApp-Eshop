import { Card, Image, Text } from '@mantine/core';
import classes from './articleCard.module.css';

interface VerticalCardProps {
  height: number;
  src: string;
}

function VerticalCard({ height, src }: VerticalCardProps) {
  return (
    <Card className={classes.vertical} style={{ height: height }} shadow="sm" padding="xl">
      <Card.Section>
        <Image src={src} h={160} alt="No way!" />
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        You&apos;ve won a million dollars in cash!
      </Text>

      <Text mt="xs" size="sm">
        Please click anywhere on this card to claim your reward, this is not a fraud, trust us
      </Text>
    </Card>
  );
}

export default VerticalCard;
