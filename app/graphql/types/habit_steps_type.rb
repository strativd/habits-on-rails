module Types
  class HabitStepsType < Types::BaseObject
    field :id, ID, null: false
    field :habit_id, Integer, null: false
    field :date, GraphQL::Types::ISO8601Date, null: false
    field :goal, Integer, null: false
    field :progress, Integer, null: false
    field :is_complete, Boolean, null: false
    field :habit, Types::HabitType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
