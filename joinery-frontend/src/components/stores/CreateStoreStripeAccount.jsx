import { useState } from 'react';
import { Button, Card, Text, Title } from '@mantine/core';
import { stripeApi } from '../../services/stripeApi.js';

const CreateStoreStripeAccount = () => {
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    setLoading(true);
    try {
      const { url } = await stripeApi.createAccountLink(window.location.origin + '/dashboard');
      window.location.href = url;
    } catch (error) {
      console.error('Failed to create Stripe account link:', error);
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <Card shadow="sm" padding="lg" radius="md" withBorder width={600} className="stripe-onboarding-card">
        <header>
          <Title order={2} mb="sm">Get Paid Securely with Stripe</Title>
          <Text size="sm" color="dimmed" mb="sm">
            Before you can start selling your products, connect a <strong>Stripe account</strong> — our trusted partner for handling payments safely and securely.
          </Text>
        </header>

        <div className="content">
          <Title order={2} mb="sm">Why we use Stripe</Title>
          <Text>
            We picked Stripe because it’s built for makers, small businesses, and independent sellers. Connecting through Stripe means:
          </Text>
          <ul>
            <li><strong>Direct payouts:</strong> You receive payments straight into your bank account.</li>
            <li><strong>Privacy & security:</strong> Sensitive financial info is handled by Stripe — we never store it.</li>
            <li><strong>Compliance handled:</strong> Stripe manages tax & verification so you don’t have to.</li>
            <li><strong>Sell nationwide:</strong> You can accept payments from customers across the country.</li>
            <li><strong>Easy reporting:</strong> Access your transactions and payouts in your Stripe dashboard.</li>
          </ul>

          <Title order={2} mb="sm">What you’ll need</Title>
          <Text>
            The setup usually takes only a few minutes. Stripe will ask for:
          </Text>
          <ul>
            <li>Your <strong>name</strong> or business name</li>
            <li>An <strong>email address</strong> and phone number</li>
            <li>A <strong>bank account</strong> to receive payouts</li>
            <li>Basic <strong>tax info</strong> (EIN or SSN for individuals)</li>
          </ul>
          <Text color="dimmed" size="sm" mb="sm">
            All of this happens on Stripe’s secure site — we never see your bank details or documents.
          </Text>

          <Title order={2} mb="sm">How it works</Title>
          <ol>
            <li>Click <strong>“Set up Stripe account”</strong> below.</li>
            <li>You’ll be taken to Stripe’s secure onboarding flow and fill out the form.</li>
            <li>When you’re done you’ll return here, and we’ll confirm your connection.</li>
          </ol>

          <Text color="dimmed" size="sm" mb="lg">
            Note: sometimes Stripe may ask for extra verification (like a photo ID). That’s normal and keeps payments safe for everyone.
          </Text>

          <Button
          onClick={handleCreateAccount}
          loading={loading}
          disabled={loading}
          color="violet"
          className="full-width"
          >
            Set Up Stripe Account
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default CreateStoreStripeAccount;