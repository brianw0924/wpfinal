import { gql } from "@apollo/client";

export const POST_CREATED_SUBSCRIPTION = gql`
  subscription postCreated {
    postCreated {
      id
      title
      content
      number
      location
      timestamp
      from
    }
  }
`;

export const ORDER_CREATED_SUBSCRIPTION = gql`
  subscription orderCreated {
    orderCreated {
      id
      title
      content
      number
      location
      timestamp
      from
    }
  }
`;

export const POST_DELETED_SUBSCRIPTION = gql`
  subscription postDeleted {
    postDeleted
  }
`;