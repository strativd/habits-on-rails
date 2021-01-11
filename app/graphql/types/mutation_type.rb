module Types
  class MutationType < Types::BaseObject
    field :create_habit, mutation: Mutations::CreateHabit
    field :delete_habit, mutation: Mutations::DeleteHabit
    field :update_habit, mutation: Mutations::UpdateHabit
  end
end
