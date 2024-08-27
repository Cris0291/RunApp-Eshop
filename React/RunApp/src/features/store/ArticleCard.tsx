import { Center, Image, Title, Text, Group } from '@mantine/core';
import classes from './articleCard.module.css';

interface ArticleCardProps {
  height: number;
  src: string;
  title: string;
}

export function ArticleCard({ height, src, title }: ArticleCardProps) {
  return (
    <div className={classes.card}>
      <Group wrap="nowrap" gap={0}>
        <Image src={src} h={height} />
        <div className={classes.body}>
          <Title order={2} c="white">
            {title}
          </Title>
        </div>
      </Group>
    </div>
  );
}

export default ArticleCard;
