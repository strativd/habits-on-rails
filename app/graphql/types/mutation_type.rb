module Types
  class MutationType < Types::BaseObject
    field :create_habit, mutation: Mutations::CreateHabit
    field :delete_habit, mutation: Mutations::DeleteHabit
    field :update_habit, mutation: Mutations::UpdateHabit

    field :create_steps, mutation: Mutations::CreateSteps
    field :update_steps, mutation: Mutations::UpdateSteps
  end
end
