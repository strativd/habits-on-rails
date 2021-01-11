module Mutations
  class DeleteHabit < BaseMutation
    # define return fields (once habit is deleted what can be returned)
    field :habit, Types::HabitType, null: false

    # define arguments required to delete a habit
    argument :id, ID, required: true

    # define resolve method
    def resolve(args)
      begin
        habit = Habit.find_by(id: args[:id])
        if habit
          habit.destroy
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
