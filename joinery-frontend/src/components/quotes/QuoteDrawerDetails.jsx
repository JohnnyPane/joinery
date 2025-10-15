import { Image, Title, Text, Badge } from "@mantine/core";
import { useMe } from "../../hooks/useMe.js";
import { getImageUrl } from "../../utils/imageConfigs.js";
import {moneyDisplay, readableDate} from "../../utils/humanizeText.js";
import QuoteResponseDelegator from "./QuoteResponseDelegator.jsx";
import { statusColors } from "../../utils/colorConfigs.js";

const QuoteDrawerDetails = ({ quote, closeDrawer }) => {
  if (!quote) return null;
  const { data: currentUser } = useMe();
  if (!currentUser) return null;

  const imageUrl = getImageUrl(quote.product.images[0].image_url);

  const isBuyer = currentUser.id === quote.buyer.id;
  const isSeller = currentUser.current_store && (currentUser.current_store.id === quote.seller_id);
  const responderType = isBuyer ? 'buyer' : isSeller ? 'seller' : null;

  const needsToRespondAsSeller = isSeller && quote.latest_quote.role === 'buyer' && ['requested', 'responded'].includes(quote.status);
  const needsToRespondAsBuyer = isBuyer && quote.latest_quote.role === 'seller' && ['offered', 'responded'].includes(quote.status);
  const needsToRespond = needsToRespondAsSeller || needsToRespondAsBuyer;
  const sellerCanCancel = isSeller && ['requested', 'responded', 'offered'].includes(quote.status) && !needsToRespondAsSeller;

  if (!isBuyer && !isSeller) {
    return <div>You do not have permission to view this quote.</div>;
  }

  const partiesInvolved = {
    buyer: quote.buyer.first_name,
    seller: quote.seller.name
  }

  return (
    <div>
      <Title order={4}>Latest Changes</Title>
      <div className="margin-bottom">
        {quote.latest_quote.role === 'buyer' ? <Text>Quote request from {quote.buyer.first_name}</Text> : <Text>Response from {currentUser.current_store ? currentUser.current_store.name : 'Seller'}</Text>}
      </div>
      <div className="flex row">
        {imageUrl && <Image src={imageUrl} alt={quote.product.name} className="drawer-product-image-wrapper margin-right" />}

        <div className="flex column">
          <Text className="bold margin-bottom">{quote.product.name}</Text>
          <Badge color={statusColors(quote.status)} variant="light">{quote.status}</Badge>
          <div className="flex row margin-top">
            <Text size="xs" className="bold">Updated: </Text>
            <Text size="xs" color="dimmed" className="margin-left">{readableDate(quote.latest_quote.updated_at)}</Text>
          </div>
        </div>
      </div>

      <div className="margin-top">
        {quote.latest_quote.amount_in_cents > 0 && <Text><strong>Price:</strong> {moneyDisplay(quote.latest_quote.amount_in_cents)}</Text>}
        <Text className="margin-bottom"><strong>Message:</strong> {quote.latest_quote.message}</Text>
      </div>

      {(needsToRespond || sellerCanCancel) && <QuoteResponseDelegator quote={quote} responderType={responderType} closeDrawer={closeDrawer} cancelOnly={sellerCanCancel} />}

      {(isBuyer || isSeller) && quote.quotes.length > 0 && (
        <div className="margin-top">
          <Title order={4} className="margin-bottom">Previous Responses</Title>
          {quote.quotes.map((response) => (
            <div key={response.id} className="margin-bottom">
              <Text><strong>{partiesInvolved[response.role]}: </strong>{response.message}</Text>
              <Text size="xs" color="dimmed">Sent on: {readableDate(response.created_at)}</Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuoteDrawerDetails;