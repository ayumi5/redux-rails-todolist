Rails.application.routes.draw do
  devise_for :users
  resources :lists, only: [:index, :create]
  root to: "lists#index"
end
