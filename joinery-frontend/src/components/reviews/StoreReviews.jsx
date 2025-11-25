import { Divider, Text } from "@mantine/core";
import useResourceData from "../../hooks/useResourceData.js";
import StarRatingDisplay from "../ui/StarRatingDisplay.jsx";
import {readableDate} from "../../utils/humanizeText.js";

const StoreReviews = ({}) => {
  const { data: reviews, total } = useResourceData("reviews")

  if (!reviews.data || reviews.data.length === 0) return <Text className="margin-t-80 center-text">This store does not have any reviews yet.</Text>

  return (
    <div>
      <Text size="sm" color="dimmed">Total: {total}</Text>
      {reviews.data.map(reviewData => {
        const { attributes: review } = reviewData;

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

export default StoreReviews;