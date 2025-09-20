class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  validates :first_name, :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }

  def name
    "#{first_name} #{last_name}"
  end
end
