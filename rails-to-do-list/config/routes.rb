Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: "users/sessions" }
  resources :lists, only: [:index, :create, :update]
  post 'authenticate', to: "authentications#authenticate"
end
