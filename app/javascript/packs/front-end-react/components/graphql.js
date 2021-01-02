import { gql } from '@apollo/client';

export const ALL_HABITS = gql`
  query allHabits {
    allHabits {
      goal
      title
      period
      slug
      id
    }
  }
`;

export const GET_HABIT = gql`
  query habit($habitId: ID!) {
    habit(id: $habitId) {
      title
      goal
      createdAt
    }
  }
`;

export const CREATE_HABIT = gql`
  mutation createHabit($title: String!, $goal: Int!, $period: String!) {
    createHabit(input:{
      title: $title,
      goal: $goal,
      period: "daily"
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
