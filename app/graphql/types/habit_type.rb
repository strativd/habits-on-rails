module Types
  class HabitType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: true
    field :goal, Integer, null: true
    field :period, String, null: true
    field :slug, String, null: true
    field :steps, [Types::HabitStepsType], null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
