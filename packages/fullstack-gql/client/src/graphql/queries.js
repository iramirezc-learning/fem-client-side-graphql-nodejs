import gql from "graphql-tag";

export const FETCH_PETS = gql`
  query AllPets {
    pets {
      id
      name
      type
      img
      owner {
        id
        age @client
      }
    }
  }
`;

export const CREATE_PET = gql`
  mutation CreatePet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      id
      name
      type
      img
      owner {
        id
        age @client
      }
    }
  }
`;
