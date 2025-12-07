# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    user_store_ids = user.store_users.pluck(:store_id)

    can :read, [ Product, Store, Slab, Log, RoughLumber, SurfacedLumber, WoodBlock, SheetGood, ShippingOption, Review ]
    can :create, Cart

    if Current.guest_token.present?
      can :manage, Cart, guest_token: Current.guest_token, user_id: nil
      can :manage, CartItem, cart: { guest_token: Current.guest_token, user_id: nil }
    end

    return unless user.persisted?

    can :manage, Cart, user_id: user.id
    can :manage, CartItem, cart: { user_id: user.id }
    can :read, Order, user_id: user.id
    can :read, OrderItem, order: { user_id: user.id }
    can :manage, OrderItem, store_id: user_store_ids
    can :manage, Product, store_id: user_store_ids
    can :manage, Quote, author_id: user.id, author_type: 'User'
    can :manage, Quote, author_id: user_store_ids, author_type: 'Store'
    can :manage, QuoteRequest, buyer_id: user.id
    can :manage, QuoteRequest, seller_id: user_store_ids
    can :manage, ShippingOption, product: { store_id: user_store_ids }
    can :manage, Store, id: user_store_ids
    can :manage, StoreUser, store_id: user_store_ids

    if user.admin?
      can :manage, :all
    end
  end
end
