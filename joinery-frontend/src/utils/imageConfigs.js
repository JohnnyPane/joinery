const rootURL = import.meta.env.VITE_API_ROOT_URL;

export const getImageUrl = (imagePath) => {
  return rootURL + imagePath;
}