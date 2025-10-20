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

const QuoteRequest = ({ setMessage, message, quoteRequestSubmit }) => {
  const { data: user } = useMe();
  const [opened, { open, close }] = useDisclosure(false);

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

      <Modal opened={opened} onClose={close} title={<Text size="lg" className="bold">Request a Quote</Text>} size="lg">
        { user ? <RequestAQuoteDetails setDetails={setMessage} details={message} handleRequestSubmit={quoteRequestSubmit} /> : <LoginToRequestQuote /> }
      </Modal>
    </div>
  )
}

export default QuoteRequest;