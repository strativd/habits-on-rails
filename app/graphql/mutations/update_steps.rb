module Mutations
  class UpdateSteps < BaseMutation
    field :step, Types::HabitStepsType, null: false

    argument :habit_id, ID, required: true
    argument :date, GraphQL::Types::ISO8601Date, required: true
    argument :progress, Integer, required: true

    def resolve(args)
      begin
        step = Step.find_by(habit_id: args[:habit_id], date: args[:date])

        if step
          step[:progress] = args[:progress] || step[:progress]
          step.save
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
