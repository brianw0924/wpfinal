import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
  query findUser($name: String!, $password: String!) {
    findUser(name: $name, password: $password)
  }
`;

const queryPosts = (type, user) => gql`
  query ${type + (user ? "($user: String!)" : "")} {
    ${type + (user ? "(user: $user)" : "")} {
      id
      title
      timestamp
      number
      from
    }
  }
`;
export const ALL_POSTS_QUERY = queryPosts("allPosts", false);
export const GIVE_POSTS_QUERY = queryPosts("givePosts", true);
export const OBTAIN_POSTS_QUERY = queryPosts("obtainPosts", true);
export const VALID_POSTS_QUERY = queryPosts("validPosts", false);

export const POST_DETAIL_QUERY = gql`
  query postDetail($postId: ID!) {
    postDetail(postId: $postId) {
      title
      content
      number
      location
      timestamp
      from
    }
  }
`;