require 'search_object'
require 'search_object/plugin/graphql'

module Resolvers
  class BaseSearchResolver < GraphQL::Schema::Resolver
    # https://github.com/RStankov/SearchObjectGraphQL
    include SearchObject.module(:graphql)

    def escape_search_term(term)
      "%#{term.gsub(/\s+/, '%')}%"
    end
  end
end
