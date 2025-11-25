import { Text, ThemeIcon } from '@mantine/core';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import React from 'react'; // React import is good practice for JSX files

const SingleStar = ({ size, isFilled = true }) => {
  return (
    <ThemeIcon
      variant="subtle"
      color={'yellow'}
    >
      {isFilled ? <IconStarFilled size={size} /> : <IconStar size={size} />}
    </ThemeIcon>
  );
}

const FullStars = ({ rating, size }) => {
  return Array(5).fill(0).map((_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= rating;

    return <SingleStar key={index} size={size} isFilled={isFilled} />;
  });
}

function StarRatingDisplay({ rating, review_count = 0, size = 22, displayType = 'full', showCount = false }) {
  const effectiveRating = rating || 0;

  const stars = displayType === 'full' ? <FullStars rating={effectiveRating} size={size} /> : <SingleStar size={size} isFilled={effectiveRating > 0} />;

  return (
    <div className="flex row align-center">
      {stars}

      <Text size="lg" className="margin-4-l bold">{effectiveRating}</Text>
      {showCount && <Text size="lg" className="margin-4-l">({review_count})</Text>}
    </div>
  );
}

export default StarRatingDisplay;