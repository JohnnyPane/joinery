import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Title, Text, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from "@mantine/notifications";

import { useMe } from "../../hooks/useMe.js";
import { useCreateResource } from "../../hooks/useResourceMutations.js";

const RequestAQuoteDetails = ({ details, setDetails, handleRequestSubmit }) => {
  return (
    <div className="flex column center-content">
      <Text className="double-margin-bottom">Tell us what you need, and the store will provide a custom quote just for you.</Text>

      <Textarea
        placeholder="Describe your project requirements, dimensions, materials, and any other relevant details."
        label="Request Details"
        size="md"
        className="full-width margin-top"
        color="pink"
        value={details}
        onChange={(event) => setDetails(event.currentTarget.value)}
      />

      <div className="flex full-width to-right">
        <Button
          onClick={handleRequestSubmit}
          color="pink"
          className="quote-request-submit-button double-margin-top"
          disabled={!details.trim()}
        >
          Submit Request
        </Button>
      </div>
    </div>
  )
}

const LoginToRequestQuote = () => {
  return (
    <div className="flex column center-content">
      <Text className="double-margin-bottom">You need to be logged in to request a quote. Please log in or create an account to proceed.</Text>

      <Button
        component={Link}
        to="/login"
        color="pink"
        className="quote-request-login-button double-margin-top"
      >
        Log In / Sign Up
      </Button>
    </div>
  )
}

const QuoteRequest = ({ product }) => {
  const [details, setDetails] = useState('');
  const { data: user } = useMe();
  const [opened, { open, close }] = useDisclosure(false);
  const createQuoteRequest = useCreateResource('quote_requests');
  const navigate = useNavigate();

  const handleRequestSubmit = async () => {
    const payload = {
      quote_attributes: { message: details },
      product_id: product.id
    }

    try {
      await createQuoteRequest.mutateAsync(payload);
      close();
      setDetails('');
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
    <div className="double-margin-top">
      <Button
        onClick={open}
        color="pink"
        className="quote-request-button"
        fullWidth
      >
        Request a Quote
      </Button>

      <Modal opened={opened} onClose={close} title={<Title order={3}>Request a Quote</Title>} size="lg">
        { user ? <RequestAQuoteDetails setDetails={setDetails} details={details} handleRequestSubmit={handleRequestSubmit} /> : <LoginToRequestQuote /> }
      </Modal>
    </div>
  )
}

export default QuoteRequest;