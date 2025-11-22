import { useForm } from '@mantine/form';
import { Button, Title } from '@mantine/core';
import { notifications } from "@mantine/notifications";
import { useCreateResource } from "../../hooks/useResourceMutations.js";
import FormGridInputs from "../ui/FormGridInputs.jsx";

const reviewInputs = [
  { name: 'rating', label: 'Rating (max 5)', type: 'star_rating', icon: 'star' },
  { name: 'body', label: 'Details', type: 'textarea' }
]

const ProductReviewForm = ({ onSuccess, product }) => {
  const createReview = useCreateResource('reviews')

  const form = useForm({
    initialValues: {
      rating: 1,
      body: '',
      reviewable_id: product.id,
      reviewable_type: "Product"
    }
  })

  const handleSubmit = async (values) => {
    try {
      await createReview.mutateAsync(values)
      notifications.show({
        title: "Success",
        message: "Review created successfully",
        color: "green"
      })
      onSuccess();
    } catch (error) {

    }
  }
  return (
    <div>
      <Title order={4}>Add your review</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <FormGridInputs form={form} formInputs={reviewInputs} />
        <Button type="submit" className="margin-top full-width">Submit Review</Button>
      </form>
    </div>
  )
}

export default ProductReviewForm;