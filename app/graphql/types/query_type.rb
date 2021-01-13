module Types
  class QueryType < Types::BaseObject
    field :all_habits, [HabitType], null: true, description: "Return a list of all habits"

    field :habit, HabitType, null: true do
      description "Returns a habit by ID"
      argument :id, ID, required: true
    end

    field :all_steps, [HabitStepsType], null: true, description: "Return a list of all habit steps taken"

    field :daily_steps, HabitStepsType, null: true do
      description "Return habit steps taken on a specific day"
      argument :habit_id, ID, required: true
      argument :date, GraphQL::Types::ISO8601Date, required: true
    end

    def all_habits
      Habit.all.sort_by { |habit| habit.created_at }
    end

    def habit(id:)
      Habit.find_by(id: id)
    end

    def all_steps
      steps = Step.all.sort_by { |step| step.updated_at }
      steps.sort_by { |step| step.habit_id }
    end

    def daily_steps(habit_id:, date:)
      Step.find_by(habit_id: habit_id, date: date)
    end
  end
end
