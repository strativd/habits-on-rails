module Mutations
  class CreateHabit < BaseMutation
    # define return fields (once habit is created what can be returned)
    field :habit, Types::HabitType, null: false

    # define arguments required to create a habit
    argument :title, String, required: true
    argument :goal, Integer, required: true
    argument :period, String, required: true

    # define resolve method
    def resolve(args)
      begin
        habit = Habit.create(
          title: args[:title],
          goal: args[:goal],
          period: args[:period],
        )
        { habit: habit }
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
