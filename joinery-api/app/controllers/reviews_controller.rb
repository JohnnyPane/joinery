class ReviewsController < JoineryController

  private

  def included_index_resources
    [ :user ]
  end

  def review_params
    params.require(:review).permit(:rating, :body, :reviewable_type, :reviewable_id)
  end
end
