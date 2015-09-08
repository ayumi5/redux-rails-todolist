Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: "users/sessions" }
  resources :lists, only: [:index, :create]
  root to: "lists#index"
end
