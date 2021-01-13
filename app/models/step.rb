class Step < ApplicationRecord
  belongs_to :habit

  validates :date, uniqueness: { scope: :habit_id }

  after_validation :cap_progress!, :completed?, only: [:create, :update]

  def cap_progress!
    goal = self.goal
    progress = self.progress

    self.progress = 0 if progress < 0
    self.progress = goal if progress > goal
  end

  def completed?
    self.is_complete = self.progress == self.goal
  end
end
