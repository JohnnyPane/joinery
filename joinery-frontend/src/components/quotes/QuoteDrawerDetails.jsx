import { Image, Title, Text, Badge, Avatar, Tooltip, Divider } from "@mantine/core";
import { useMe } from "../../hooks/useMe.js";
import { getImageUrl } from "../../utils/imageConfigs.js";
import { moneyDisplay, readableDate, readableDateTime } from "../../utils/humanizeText.js";
import QuoteResponseDelegator from "./QuoteResponseDelegator.jsx";
import { statusColors } from "../../utils/colorConfigs.js";
import { productUnitDisplays } from "../../utils/productDimensions.js";
import JoineryAvatar from "../ui/JoineryAvatar.jsx";

const offerText = {
  accepted: 'Final ',
  declined: 'Final ',
  cancelled: 'Final ',
  responded: 'Latest ',
  offered: 'Latest ',
  requested: 'Latest ',
}

const QuoteDrawerDetails = ({ quote, closeDrawer }) => {
  if (!quote) return null;
  const { data: currentUser } = useMe();
  if (!currentUser) return null;

  const { buyer, seller, latest_quote } = quote;

  const imageUrl = getImageUrl(quote.product.images[0].image_url);

  const isBuyer = currentUser.id === quote.buyer.id;
  const isSeller = currentUser.current_store && (currentUser.current_store.id === quote.seller_id);
  const responderType = isBuyer ? 'buyer' : isSeller ? 'seller' : null;

  const needsToRespondAsSeller = isSeller && latest_quote.role === 'buyer' && ['requested', 'responded'].includes(quote.status);
  const needsToRespondAsBuyer = isBuyer && latest_quote.role === 'seller' && ['offered', 'responded'].includes(quote.status);
  const needsToRespond = needsToRespondAsSeller || needsToRespondAsBuyer;
  const sellerCanCancel = isSeller && ['requested', 'responded', 'offered'].includes(quote.status) && !needsToRespondAsSeller;

  if (!isBuyer && !isSeller) {
    return <div>You do not have permission to view this quote.</div>;
  }

  const volumeUnitDisplay = quote.pricing_unit === 'each' ? quote.requested_volume == 1.0 ? 'unit' : 'units' : productUnitDisplays[quote.pricing_unit]

  return (
    <div>
      {/*<Title order={4}>Latest Changes</Title>*/}

      {/*<div className="margin-bottom">*/}
      {/*  {quote.latest_quote.role === 'buyer' ? <Text>Quote request from {quote.buyer.first_name}</Text> : <Text>Response from {currentUser.current_store ? currentUser.current_store.name : 'Seller'}</Text>}*/}
      {/*</div>*/}

      <div className="flex row align-center">
        <Title order={2}>{offerText[quote.status]} offer: {moneyDisplay(latest_quote.amount_in_cents)}</Title>

        <Badge className="margin-left" variant="default" color="violet" size="xl">{quote.quote_type} Quote</Badge>
      </div>

      <Text size="lg"><strong>Requested Volume: </strong>{quote.requested_volume} {volumeUnitDisplay}</Text>

      <div className="flex row align-center margin-top double-margin-bottom">
        <JoineryAvatar user={latest_quote.role === 'buyer' ? buyer : seller} />

        <div className="flex column margin-left">
          <Text size="xs" color="dimmed">{readableDateTime(latest_quote.created_at)}</Text>
          <Text>{latest_quote.message}</Text>
        </div>
      </div>

      {(needsToRespond || sellerCanCancel) &&
        <QuoteResponseDelegator quote={quote} responderType={responderType} closeDrawer={closeDrawer} cancelOnly={sellerCanCancel} />
      }

      <Divider className="margin-bottom double-margin-top" />

      <Title order={3} className="margin-bottom">Product & Quote Details</Title>

      <div className="flex row">
        {imageUrl && <Image src={imageUrl} alt={quote.product.name} className="drawer-product-image-wrapper margin-right" />}

        <div className="flex column">
          <Title order={4}>{quote.product.name}</Title>
          <div className="flex row margin-bottom">
            <Text size="sm">Updated: </Text>
            <Text size="sm" color="dimmed" className="margin-left">{readableDate(quote.latest_quote.updated_at)}</Text>
          </div>

          <Badge color={statusColors(quote.status)} variant="light">{quote.status}</Badge>

        </div>
      </div>

      <Text className="margin-top"><strong>Requested Volume: </strong>{quote.requested_volume} {volumeUnitDisplay}</Text>

      <Divider className="double-margin-top margin-bottom" />

      {(isBuyer || isSeller) && quote.quotes.length > 0 && (
        <div>
          <Title order={3} className="margin-bottom">Quote History</Title>

          {quote.quotes.map((response) => {
            return (
              <div key={response.id} className="double-margin-bottom flex row align-start">
                <JoineryAvatar user={response.role === 'buyer' ? buyer : seller} size={40} />

                <div className="flex column margin-left">
                  <Text size="xs" color="dimmed">{readableDateTime(response.created_at)}</Text>
                  <Text size="sm">{response.message}</Text>
                  {response.amount_in_cents > 0 && <Text size="sm"><strong>{moneyDisplay(response.amount_in_cents)}</strong></Text>}
                </div>
              </div>
            );
          }
        )}
        </div>
      )}
    </div>
  );
}

export default QuoteDrawerDetails;