module Resolvers
  class StepsSearch < BaseSearchResolver
    # Define schema for steps query
    type [Types::HabitStepsType]
    description "List Habit progress steps"

    # Scope steps to Habit if one is provided
    scope { object.respond_to?(:steps) ? object.steps : Step.all }

    # Order steps by provided 'order' argument
    class OrderEnum < Types::BaseEnum
      graphql_name 'StepsOrder'
  
      value 'DATE'
      value 'HABIT'
      value 'RECENT'
      value 'UPDATED'
    end

    option :order, type: OrderEnum, default: 'DATE'
    # Define filter arguments as well  
    option :id, type: ID, with: :apply_id_filter,
      description: "Return Habit steps by ID"
    option :habit_id, type: ID, with: :apply_habit_id_filter,
      description: "Return Habit steps by Habit ID"
    option :date, type: Types::DateType, with: :apply_date_filter,
      description: "Return Habit steps on one day ('YYYY-MM-DD')"
    option :start_date, type: Types::DateType, with: :apply_start_date_filter,
      description: "Return Habit steps on and after given start date ('YYYY-MM-DD')"
    option :end_date, type: Types::DateType, with: :apply_end_date_filter,
      description: "Return Habit steps on and before given end date ('YYYY-MM-DD')"

    ### Filter Steps using parameters ###

    def apply_id_filter(scope, value)
      scope.where id: value
    end

    def apply_habit_id_filter(scope, value)
      scope.where habit_id: value
    end

    def apply_date_filter(scope, value)
      scope.where date: Date.new(value.year, value.month, value.day)
    end

    def apply_start_date_filter(scope, value)
      scope.where 'date >= ?', Date.new(value.year, value.month, value.day)
    end

    def apply_end_date_filter(scope, value)
      scope.where 'date <= ?', Date.new(value.year, value.month, value.day)
    end

    ### Order Steps ###

    def apply_order_with_date(scope)
      scope.order 'date ASC'
    end
  
    def apply_order_with_habit(scope)
      scope.order 'habit_id ASC'
    end
  
    def apply_order_with_recent(scope)
      scope.order 'created_at DESC'
    end

    def apply_order_with_updated(scope)
      scope.order 'updated_at DESC'
    end
  end
end
