module Mutations
  class UpdateSteps < BaseMutation
    field :step, Types::HabitStepsType, null: false

    argument :habit_id, ID, required: true
    argument :date, Types::DateType, required: true
    argument :progress, Integer, required: true

    def resolve(args)
      begin
        step = Step.find_by(habit_id: args[:habit_id], date: args[:date])

        if step
          step[:progress] = args[:progress] || step[:progress]
          step.save  
        else
          # step does not exist, start recording one!
          habit = Habit.find_by(id: args[:habit_id])

          if habit
            step = Step.create(
              habit_id: habit[:id],
              date: args[:date],
              goal: habit[:goal],
              progress: args[:progress],
            )
          else
            # TODO raise "no habit exists" error
            return
          end
        end

        return { step: step }

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
