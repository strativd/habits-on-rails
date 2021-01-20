module Types
  class QueryType < Types::BaseObject
    field :habits, resolver: Resolvers::HabitsSearch
    field :steps, resolver: Resolvers::StepsSearch
  end
end
