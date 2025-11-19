Rails.application.routes.draw do
  scope "/api" do
    devise_for :users, path: "", path_names: {
      sign_in: "login",
      sign_out: "logout",
      registration: "signup"
    }, controllers: {
      sessions: "users/sessions",
      registrations: "users/registrations"
    }

    devise_scope :user do
      get "/users/me", to: "users/sessions#me"
    end

    get "carts/user_cart", to: "carts#user_cart"
    resources :carts, only: [ :show, :create, :update, :destroy ] do
      resources :cart_items, only: [ :create, :update, :destroy ]
    end

    resources :cart_items, only: [ :index ] do
      collection do
        put :update_many
      end
    end

    resources :orders, only: [ :index, :show, :create ]
    resources :order_items, only: [ :index, :show, :create, :update, :destroy ]
    resources :products, only: [ :index, :show, :create, :update, :destroy ]
    resources :quote_requests, only: [ :index, :show, :create, :update, :destroy ]
    resources :quotes, only: [ :index, :show, :create, :update, :destroy ]
    resources :shipping_options, only: [ :index, :show, :create, :update, :destroy ]
    resources :stores, only: [ :index, :show, :create, :update, :destroy ]

    post "products/:id/upload_images", to: "products#upload_images"
    delete "products/:id/images/:image_id", to: "products#destroy_image"
    post "stores/:id/upload_images", to: "stores#upload_images"

    post "/stripe/webhooks", to: "stripe_webhooks#create"
    post "/stripe/create_account_link", to: "stripe#create_account_link"
  end
end
