import { gql } from '@apollo/client';

/*** HABIT STEPS & PROGRESS ***/

export const GET_DAILY_STEPS = gql`
  query dailySteps($habitId: ID!, $date: ISO8601Date!) {
    dailySteps(
      habitId: $habitId,
      date: $date,
    ) {
      progress
      isComplete
      habit {
        title
        id
      }
    }
  }
`;

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

/*** HABITS ***/

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