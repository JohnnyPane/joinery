const rootURL = import.meta.env.VITE_API_ROOT_URL;
const imageBucketURL = import.meta.env.VITE_AWS_BUCKET_URL;

export const getImageUrl = (imagePath) => {
  return rootURL + imagePath;
}

export const getBucketImageUrl = (imagePath) => {
  return imageBucketURL + imagePath;
}