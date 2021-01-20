module Resolvers
  class HabitsSearch < BaseSearchResolver
    # Define schema for habits query
    type [Types::HabitType], null: false
    description "List Habits"

    # Provide initial scopre for filtering habits
    scope { Habit.all }

    # Order habits by provided 'order' argument
    class OrderEnum < Types::BaseEnum
      graphql_name 'HabitsOrder'
  
      value 'GOAL'
      value 'PERIOD'
      value 'RECENT'
      value 'CREATED'
      value 'UPDATED'
    end

    option :order, type: OrderEnum, default: 'CREATED'
    # Define filter arguments as well  
    option :id, type: ID, with: :apply_id_filter,
      description: "Return Habit by ID"
    option :search, type: String, with: :apply_search_filter,
      description: "Search Habit title (case sensitive)"
    option :period, type: String, with: :apply_period_filter,
      description: "Return Habits by period (can be 'daily' or 'weekly')"

    ### Filter Steps using parameters ###

    def apply_id_filter(scope, value)
      scope.where id: value
    end

    def apply_search_filter(scope, value)
      scope.where 'LOWER(title) LIKE ?', escape_search_term(value.downcase)
    end
  
    def apply_period_filter(scope, value)
      scope.where period: value.downcase
    end

    ### Order Steps ###

    def apply_order_with_goal(scope)
      scope.order 'goal ASC'
    end
  
    def apply_order_with_period(scope)
      scope.order 'period ASC'
    end
  
    def apply_order_with_recent(scope)
      scope.order 'created_at DESC'
    end

    def apply_order_with_created(scope)
      scope.order 'created_at ASC'
    end

    def apply_order_with_updated(scope)
      scope.order 'updated_at DESC'
    end
  end
end
