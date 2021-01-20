module Types
  class HabitStepsType < Types::BaseObject
    field :id, ID, null: false
    field :habit_id, Integer, null: false
    field :date, Types::DateType, null: false
    field :goal, Integer, null: false
    field :progress, Integer, null: false
    field :is_complete, Boolean, null: false
    field :habit, Types::HabitType, null: false
    field :created_at, Types::DateTimeType, null: false
    field :updated_at, Types::DateTimeType, null: false
  end
end
