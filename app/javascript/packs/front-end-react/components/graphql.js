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