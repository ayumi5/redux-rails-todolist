class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  def self.authenticate(email, password)
    user = User.find_by_email(email)
    user && user.valid_password?(password) ? user : nil
  end
end
