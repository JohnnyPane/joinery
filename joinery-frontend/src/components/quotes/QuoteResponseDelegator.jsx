import { useState } from "react";
import { NumberInput, Title, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {IconCurrencyDollar} from "@tabler/icons-react";
import QuoteResponseModal from "./QuoteResponseModal.jsx";


const SellerResponseActions = ({ setPrice, price, handleButtonClick, cancelOnly }) => {
  return (
    <div>
      <Title order={4} className="margin-bottom">Your Response</Title>
      {!cancelOnly &&
        <NumberInput
          label="Your Price Offer"
          w={240}
          placeholder="Enter your price offer"
          leftSection={<IconCurrencyDollar size={16} />}
          value={price}
          onChange={(value) => setPrice(value)}
          decimalScale={2}
          fixedDecimalScale
          min={0}
          className="margin-bottom"
        />
      }

      <div>
        <Button
          onClick={() => handleButtonClick(cancelOnly ? 'cancel' : 'decline')}
          variant={cancelOnly ? "filled" : "light"}
          color="red"
          className="action-button"
        >
          {cancelOnly ? 'Cancel Quote' : 'Decline Quote'}
        </Button>

        {!cancelOnly && <Button
          onClick={() => handleButtonClick('offer')}
          variant="light"
          color="blue"
          className="action-button margin-left"
          disabled={!price || price <= 0}
        >
          Send Quote
        </Button>}
      </div>
    </div>
  );
}

const BuyerResponseActions = ({ handleButtonClick }) => {
  return (
    <div>
      <Button onClick={() => handleButtonClick('accept')} color="green" className="margin-right" variant="light">Accept</Button>
      <Button onClick={() => handleButtonClick('respond')} color="blue" className="margin-right" variant="light">Respond</Button>
      <Button onClick={() => handleButtonClick('decline')} color="red" variant="light">Decline</Button>
    </div>
  );
}

const ResponseActions = ({ quote, quoteActor, closeDrawer, cancelOnly }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [action, setAction] = useState('respond');
  const [price, setPrice] = useState('');

  const handleButtonClick = (type) => {
    setAction(type);
    open();
  }

  const onClose = () => {
    setAction('respond');
    closeDrawer();
    close();
  }

  return (
    <div>
      { quoteActor === 'buyer' && <BuyerResponseActions handleButtonClick={handleButtonClick} /> }
      { quoteActor === 'seller' &&
        <SellerResponseActions cancelOnly={cancelOnly} quote={quote} price={price} setPrice={setPrice} handleButtonClick={handleButtonClick} />
      }

      <Modal opened={opened} onClose={close} size="lg" title="Respond To Quote Request">
        <QuoteResponseModal quote={quote} action={action} onClose={onClose} price={price} />
      </Modal>
    </div>
  );
}

const QuoteResponseDelegator = ({ quote, responderType, closeDrawer, cancelOnly = false }) => {
  if (!quote || !responderType) return null;

  return (
    <div className="margin-top">
      <ResponseActions quote={quote} quoteActor={responderType} closeDrawer={closeDrawer} cancelOnly={cancelOnly} />
    </div>
  );
}

export default QuoteResponseDelegator;

