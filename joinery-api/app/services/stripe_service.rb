class StripeService
  attr_reader :order, :payment_method

  def initialize(order, payment_method)
    @order = order
    @payment_method = payment_method
  end

  def create_charge
    if order.total_amount_in_cents <= 0
      raise "Order total amount must be greater than zero to create a charge."
    end

    Stripe::PaymentIntent.create({
       amount: order.total_amount_in_cents,
       currency: "usd",
       automatic_payment_methods: {
         enabled: true,
         allow_redirects: "never"
       },
       payment_method: payment_method,
       confirm: true,
       description: "Order ##{order.id}",
       metadata: {
         order_id: order.id,
         customer_email: order.customer_email
       }
     })
  end
end
