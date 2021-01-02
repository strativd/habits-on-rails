module Types
  class QueryType < Types::BaseObject
    field :all_habits, [HabitType], null: true, description: "Return a list of all habits"

    field :habit, HabitType, null: true do
      description "Returns a habit by ID"
      argument :id, ID, required: true
    end

    def all_habits
      Habit.all
    end

    def habit(id:)
      Habit.find_by(id: id)
    end
  end
end
