module Mutations
  class CreateSteps < BaseMutation
    field :step, Types::HabitStepsType, null: false

    argument :habit_id, ID, required: true
    argument :date, GraphQL::Types::ISO8601Date, required: true
    argument :progress, Integer, required: true

    def resolve(args)
      begin
        habit = Habit.find_by(id: args[:habit_id])

        if habit
          step = Step.create(
            habit_id: habit[:id],
            date: args[:date],
            goal: habit[:goal],
            progress: args[:progress],
          )
          { step: step }
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
