import { gql } from '@apollo/client';

/*** QUERIES W/ FILTERING ***/

export const GET_HABITS = gql`
  query habits($id: ID, $orderBy: HabitsOrder, $query: String, $period: String) {
    habits (
      id: $id
      order: $orderBy
      search: $query
      period: $period
    ) {
      id
      title
      goal
      period
      slug
    }
  }
`;

export const GET_STEPS = gql`
  query steps($id: ID, $habitId: ID, $orderBy: StepsOrder, $date: ISO8601Date, $startDate: ISO8601Date, $endDate: ISO8601Date) {
    steps(
      id: $id
      habitId: $habitId
      date: $date
      startDate: $startDate
      endDate: $endDate
      order: $orderBy
    ) {
      habitId
      date
      goal
      progress
      isComplete
    }
  }
`;

/*** MUTATIONS ***/

export const UPDATE_DAILY_STEPS = gql`
  mutation updateSteps($habitId: ID!, $date: ISO8601Date!, $progress: Int!) {
    updateSteps(input:{
      habitId: $habitId,
      date: $date,
      progress: $progress,
    }) {
      step {
        progress
        isComplete
        habit {
          title
          id
        }
      }
    }
  }
`;

export const CREATE_HABIT = gql`
  mutation createHabit($title: String!, $goal: Int!, $period: String!) {
    createHabit(input:{
      title: $title,
      goal: $goal,
      period: $period
    }) {
      habit {
        id
        title
        slug
        goal
      }
    }
  }
`;

export const UPDATE_HABIT = gql`
  mutation updateHabit($id: ID!, $title: String, $goal: Int, $period: String) {
    updateHabit(input:{
      id: $id,
      title: $title,
      goal: $goal,
      period: $period
    }) {
      habit {
        id
        title
        slug
        goal
        period
      }
    }
  }
`;

export const DELETE_HABIT = gql`
  mutation deleteHabit($id: ID!) {
    deleteHabit(input:{
      id: $id
    }) {
      habit {
        id
        title
      }
    }
  }
`;
