class AuthenticateUser
  prepend SimpleCommand
  require_relative '../../lib/json_web_token'

  def initialize(email, password)
    @email = email
    @password = password
  end

  def call
    JsonWebToken.encode(user_id: user.id) if user
  end

  private

  attr_accessor :email, :password

  def user
    return User.authenticate(email, password)

    errors.add :user_authentication, "invalid credentials"
    nil
  end
end
