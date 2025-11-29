import { Divider, Text } from '@mantine/core';
import StarRatingDisplay from "../ui/StarRatingDisplay.jsx";
import { readableDate } from "../../utils/humanizeText.js";

const ProductReviewPreviews = ({ reviews }) => {
  const reviewsCount = reviews.length;

  if (reviewsCount === 0) {
    return <Text className="margin-t-40 center-text">Item has not been reviewed.</Text>
  }

  return (
    <div>
      {reviews.map(review => {

        return (
          <div className="double-margin" key={review.id}>
            <div className="flex row space-between">
              <StarRatingDisplay rating={review.rating} showCount={false} />

              <Text size="sm">{review.author.name}</Text>
            </div>

            <Text className="margin-4-t margin-4-b italic">{review.body}</Text>
            <Text size="sm" color="dimmed">{readableDate(review.created_at)}</Text>

            <Divider className="margin-top" />
          </div>
        )
      })}
    </div>
  )
}

export default ProductReviewPreviews;