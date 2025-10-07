import joineryClient from "./joineryClient.js";

export const stripeApi = {
  async createAccountLink(returnUrl) {
    try {
      const response = await joineryClient.post('/stripe/create_account_link');
      return response.data;
    } catch (error) {
      throw new Error('Failed to create Stripe account link');
    }
  }
}

