import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";

const rootURL = import.meta.env.VITE_API_ROOT_URL;

const JoineryImageCarousel = ({ images, height = 300, objectFit = 'cover' }) => {

  const slides  = images.map((image, index) => (
    <Carousel.Slide key={index}>
      <Image
        src={rootURL + image.image_url}
        alt={image.alt || `Image ${index + 1}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: objectFit,
          borderRadius: 8,
        }}
      />
    </Carousel.Slide>
  ));

  const displayControls = images.length > 1;

  return (
    <Carousel
      slideSize="100%"
      slideGap="md"
      align="start"
      loop
      withIndicators={displayControls}
      withControls={displayControls}
      height={height}
      styles={{
        viewport: {
          // maxWidth: 400,
          margin: '0 auto',
        },
      }}
    >
      {slides}
    </Carousel>
  );
}

export default JoineryImageCarousel;