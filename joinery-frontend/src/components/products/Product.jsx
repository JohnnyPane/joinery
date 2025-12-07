import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Accordion, Text, ThemeIcon, Title, Anchor, Divider, Skeleton, Grid } from '@mantine/core';
import { notifications } from "@mantine/notifications";
import { IconWood } from "@tabler/icons-react";

import './Product.scss'

import { productTypeDisplayName } from "../../utils/productConfigs.js"
import { moneyDisplay } from '../../utils/humanizeText.js'
import useResource from '../../hooks/useResource.js'
import { useCreateResource } from "../../hooks/useResourceMutations.js";

import JoineryImageCarousel from "../ui/JoineryImageCarousel.jsx"
import ProductDetails from './ProductDetails.jsx'
import AddToCart from "../cart/AddToCart.jsx";
import QuoteRequest from "../quotes/QuoteRequest.jsx";
import StarRatingDisplay from "../ui/StarRatingDisplay.jsx";
import ProductReviewPreviews from "../reviews/ProductReviewPreviews.jsx";
import { productUnitDisplays } from "../../utils/productDimensions.js";

const PricingText = ({ priceInCents, quantity, unit }) => {
  const unitDisplay = productUnitDisplays[unit] || '';
  const quantityDisplay = unit === 'each' ? Math.floor(quantity) : quantity;
  const quantityText = unitDisplay ? `${quantityDisplay} ${unitDisplay}` : quantityDisplay;
  const titleText = unitDisplay ? `/${unitDisplay}` : '';

  return (
    <div className="product-detail-price flex row align-bottom space-between padding">
      <div className="flex row align-center">
        <Title order={2} className="padding-left">{moneyDisplay(priceInCents)}</Title>

        <Text size="lg">{titleText}</Text>
      </div>
      {<Text size="sm" color="dimmed">Qty. {quantityText} </Text>}
    </div>
  );
}

const QuoteRequestText = () => (
  <div className="product-detail-price flex row space-between padding">
    <span className="label-large padding-left">Price Upon Request</span>
    <Text size="sm" color="dimmed" className="padding-left">Please request a quote</Text>
  </div>
);

const Product = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const { data: product, isLoading, isError, error } = useResource('products', id);
  const createQuoteRequest = useCreateResource('quote_requests');

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Grid className="page">
        <Grid.Col span={6}>
          <Skeleton height={400} radius="md" />
        </Grid.Col>
        <Grid.Col span={6}>
          <Skeleton height={120} radius="md" mb={20} />

          <Skeleton height={20} width="50%" radius="md" mb={10} />
          <Skeleton height={20} width="60%" radius="md" mb={10} />
          <Skeleton height={40} width="80%" radius="md" mb={10} />
          <Skeleton height={40} width="80%" radius="md" mb={10} />
        </Grid.Col>
      </Grid>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const quoteRequestSubmit = async (type = 'product', quantity) => {
    const payload = {
      quotes_attributes: [{ message: message }],
      quote_type: type,
      product_id: product.id,
      requested_volume: quantity || 1,
    }

    try {
      await createQuoteRequest.mutateAsync(payload);
      close();
      setMessage('');
      notifications.show({
        title: 'Success',
        message: 'Quote request submitted successfully',
        position: 'top-right',
        color: 'green',
      });
      navigate('/quotes');
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: `Error submitting quote request: ${err.response?.data?.error || err.message}`,
        position: 'top-right',
        color: 'red',
      });
    }
  };

  return (
    <div className="product-detail-container">
      <div className="product-image-carousel">
        <JoineryImageCarousel images={product.images} objectFit='contain' />
      </div>

      <div className="product-info">
        <Title order={2} className="header-1">{product.name}</Title>

        <StarRatingDisplay
          rating={product.average_rating}
          review_count={product.reviews_count}
          showCount={true}
        />

        <Text size="lg" className="italic margin-bottom">{productTypeDisplayName[product.productable_type]}</Text>

        <Accordion defaultValue="description" className="double-margin-top">
          <Accordion.Item key="description" value="description">
            <Accordion.Control value="description" className="accordion-panel-header">Description</Accordion.Control>
            <Accordion.Panel className="product-detail-description">{product.description}</Accordion.Panel>
          </Accordion.Item>

          <ProductDetails product={product} />
        </Accordion>

        <div className="flex row align-center double-margin-top double-margin-bottom">
          <ThemeIcon variant="transparent" color="black">
            <IconWood size={20}/>
          </ThemeIcon>

          <Text>Made by </Text>
          <Anchor
            href={`/stores/${product.store.id}`}
            className="bold margin-4-l"
            style={{ verticalAlign: 'middle', color: 'black' }}
            color="black"
            component="a"
          >
            {product.store.name}
          </Anchor>
        </div>

        {product.requestable ? <QuoteRequestText /> : <PricingText priceInCents={product.price_per_unit_in_cents} quantity={product.available_volume} unit={product.pricing_unit} />}

        { product.requestable ?
          <QuoteRequest message={message} setMessage={setMessage} quoteRequestSubmit={() => quoteRequestSubmit('product')} /> :
          <AddToCart productId={product.id} message={message} setMessage={setMessage} quoteRequestSubmit={quoteRequestSubmit} />
        }

        <Title className="margin-t-40" order={3}>Reviews</Title>
        <Divider className="double-margin"/>

        <ProductReviewPreviews reviews={product.recent_reviews} />

      </div>
    </div>
  );
}

export default Product;
