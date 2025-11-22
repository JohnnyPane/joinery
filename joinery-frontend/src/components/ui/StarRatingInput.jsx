import { useState } from 'react';
import { Group, ActionIcon } from '@mantine/core';
import { IconStar, IconStarFilled } from '@tabler/icons-react';

function StarRatingInput({ value, onChange, count = 5 }) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const displayRating = hoveredRating || value;

  const stars = Array(count).fill(0).map((_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= displayRating;

    return (
      <ActionIcon
        key={index}
        size="lg"
        variant="subtle"
        color={isFilled ? 'yellow' : 'gray'}
        onClick={() => onChange(starValue)}
        onMouseEnter={() => setHoveredRating(starValue)}
        onMouseLeave={() => setHoveredRating(0)}
      >
        {isFilled ? <IconStarFilled className={isFilled ? 'star-selected-pop' : ''} /> : <IconStar />}
      </ActionIcon>
    );
  });

  return (
    <Group spacing="xs">
      {stars}
    </Group>
  );
}

export default StarRatingInput;