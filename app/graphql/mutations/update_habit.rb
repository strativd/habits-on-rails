module Mutations
  class UpdateHabit < BaseMutation
    field :habit, Types::HabitType, null: false

    argument :id, ID, required: true
    argument :title, String, required: false
    argument :goal, Integer, required: false
    argument :period, String, required: false

    def resolve(args)
      begin
        habit = Habit.find_by(id: args[:id])

        if habit
          habit[:title] = args[:title] || habit[:title]
          habit[:goal] = args[:goal] || habit[:goal]
          habit[:period] = args[:period] || habit[:period]
          habit.save
          
          { habit: habit }
        end
      rescue ActiveRecord::RecordInvalid => invalid
        GraphQL::ExecutionError.new(
          {
            errors: invalid.record.errors.full_messages
          }.to_json
        )
      end
    end
  end
end
