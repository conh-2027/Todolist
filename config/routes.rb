Rails.application.routes.draw do
  devise_for :users, path: 'api', path_names: { sign_in: 'login', sign_out: 'logout'}
  # resources :articles
  resources :users do
    resources :articles
  end

  resources :articles

  resources :tags
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
