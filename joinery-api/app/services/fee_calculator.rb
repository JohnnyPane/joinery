class FeeCalculator
  STRIPE_PERCENTAGE_FEE = 0.029
  STRIPE_FIXED_FEE_CENTS = 30
  JOINERY_FEE_PERCENTAGE = 0.10

  def self.joinery_fee(amount_cents)
    (amount_cents * JOINERY_FEE_PERCENTAGE).round
  end

  def self.stripe_fee(amount_cents)
    percentage_fee = (amount_cents * STRIPE_PERCENTAGE_FEE).ceil
    percentage_fee + STRIPE_FIXED_FEE_CENTS
  end

  def self.calculate_fee(amount_cents)
    stripe_fee(amount_cents) + joinery_fee(amount_cents)
  end

  def self.net_amount(amount_cents)
    fee = calculate_fee(amount_cents)
    net_amount = amount_cents - fee
    net_amount
  end

  def self.vendor_net_share(total_amount_cents, vendor_amount_cents)
    net_total = net_amount(total_amount_cents)

    ((vendor_amount_cents.to_f / total_amount_cents) * net_total).round
  end
end
