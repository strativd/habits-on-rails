module Types
  class MutationType < Types::BaseObject
    field :create_habit, mutation: Mutations::CreateHabit
  end
end
