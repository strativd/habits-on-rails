module Types
  class QueryType < Types::BaseObject
    field :all_habbits, [HabbitType], null: true, description: "Return a list of all habbits"

    field :habbit, HabbitType, null: true do
      description "Returns a book by ID"
      argument :id, ID, required: true
    end

    def all_habbits
      Habbit.all
    end

    def habbit(id:)
      Habbit.find_by(id: id)
    end
  end
end
