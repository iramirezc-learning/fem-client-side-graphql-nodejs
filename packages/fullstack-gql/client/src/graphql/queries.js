import gql from "graphql-tag";

export const FETCH_PETS = gql`
  query AllPets {
    pets {
      id
      name
      type
      img
    }
  }
`;
