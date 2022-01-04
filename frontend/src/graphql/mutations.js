import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($name: String!) {
    createUser(name: $name)
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation newPost($input: NewPostInput!) {
    newPost(input: $input) {
      id
      title
      timestamp
    }
  }
`;

export const ORDER_MUTATION = gql`
  mutation order($name: String!, $postId: ID!) {
    order(name: $name, postId: $postId)
  }
`;
