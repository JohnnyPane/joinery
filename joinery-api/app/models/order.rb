class Order < ApplicationRecord
  belongs_to :user, optional: true
  has_many :order_items, dependent: :destroy
  has_many :products, through: :order_items
  has_one :billing_address, -> { where(address_type: "billing") }, as: :addressable, class_name: "Address", dependent: :destroy
  has_one :shipping_address, -> { where(address_type: "shipping") }, as: :addressable, class_name: "Address", dependent: :destroy

  accepts_nested_attributes_for :billing_address, allow_destroy: true
  accepts_nested_attributes_for :shipping_address, allow_destroy: true

  validates :customer_email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :customer_name, presence: true

  enum :status, { pending: 0, paid: 1, shipped: 2, completed: 3, cancelled: 4 }

  def total_shipping_cost_in_cents
    order_items.sum(&:shipping_cost_in_cents)
  end
end
