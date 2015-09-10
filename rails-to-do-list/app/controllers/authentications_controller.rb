class AuthenticationsController < ApplicationController
  protect_from_forgery except: [:authenticate]
  skip_before_action :authenticate_request

  def authenticate
    command = AuthenticateUser.call(params[:user][:email], params[:user][:password])
    if command.success?
      render json: { auth_token: command.result }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end
end
