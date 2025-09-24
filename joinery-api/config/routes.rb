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

    resources :stores, only: [ :index, :show, :create, :update, :destroy ]
    resources :products, only: [ :index, :show, :create, :update, :destroy ]
  end
end
