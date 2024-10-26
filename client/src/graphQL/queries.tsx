// src/queries.ts
import { gql } from '@apollo/client';

// Query to get the balance by telegramId
export const GET_BALANCE_BY_ID = gql`
  query GetBalanceById($telegramId: String!) {
    getBalanceById(telegramId: $telegramId) {
      id
      balance
    }
  }
`;

// Mutation to update the balance by userId
export const UPDATE_BALANCE = gql`
  mutation UpdateCoinBalance($userId: ID!, $newBalance: Int!) {
    updateCoinBalance(userId: $userId, newBalance: $newBalance) {
      id
      balance
    }
  }
`;
