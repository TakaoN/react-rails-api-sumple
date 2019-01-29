Rails.application.routes.draw do
  #get 'messages/index'
  resources :messages, only: [:index, :create, :show, :update, :destroy], format: :json
end
