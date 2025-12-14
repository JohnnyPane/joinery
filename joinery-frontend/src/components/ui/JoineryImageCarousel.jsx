import { useState } from "react";
import { Carousel } from "@mantine/carousel";
import { Image, Skeleton } from "@mantine/core";

const rootURL = import.meta.env.VITE_API_ROOT_URL;

const JoineryImageCarousel = ({ images, height = 400, objectFit = 'cover', name = '' }) => {
  const [loading, setLoading] = useState(true);


  const slides  = images.map((image, index) => (
    <Carousel.Slide key={index}>
      <Skeleton visible={loading} height={loading ? height : "100%"} radius={8} >
        <Image
          src={rootURL + image.image_url}
          alt={image.alt || `Image ${index + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: objectFit,
            borderRadius: 8,
          }}
          fallbackSrc={`https://placehold.co/600?text=${name}&font=Lora`}
          onLoad={() => setLoading(false)}
        />
      </Skeleton>
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
      // height={height}
      styles={{
        viewport: {
          // maxWidth: 400,
          margin: '0 auto',
        },
      }}
    >
      {images.length > 0 ? slides : <Image src={`https://placehold.co/600?text=(image not available)&font=Lora`} alt="No image available" />}
    </Carousel>
  );
}

export default JoineryImageCarousel;