import { Text, ThemeIcon } from '@mantine/core';
import { IconStar, IconStarFilled } from '@tabler/icons-react';

function StarRatingDisplay({ rating, size = 16 }) {
  const stars = Array(5).fill(0).map((_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= rating;

    return (
      <ThemeIcon
        key={index}
        variant="subtle"
        color={'yellow'}
      >
        {isFilled ? <IconStarFilled size={size} /> : <IconStar size={size} />}
      </ThemeIcon>
    );
  });

  return (
    <div className="flex row align-center">
      {stars}

      <Text size="lg" className="bold margin-left">{rating}</Text>
    </div>
  );
}

export default StarRatingDisplay;