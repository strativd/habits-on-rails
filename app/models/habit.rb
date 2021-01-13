class Habit < ApplicationRecord
  has_many :steps, dependent: :destroy
  # Ensure the set_slug is called on create and update actions
  after_validation :set_slug, only: [:create, :update]

  # To generate the slug we should force Rails to use both slug and ids
  # instead of just the ids by overwriting the to_param method
  def to_param
    "#{id}-#{slug}"
  end

  private

  def set_slug
    self.slug = title.to_s.parameterize
  end 
end
