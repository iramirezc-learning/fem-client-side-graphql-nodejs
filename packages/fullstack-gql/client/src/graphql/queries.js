import gql from "graphql-tag";

export const PETS_FIELDS = gql`
  fragment PetsFields on Pet {
    id
    name
    type
    img
    owner {
      id
      age @client
    }
  }
`;

export const FETCH_PETS = gql`
  query AllPets {
    pets {
      ...PetsFields
    }
  }
  ${PETS_FIELDS}
`;

export const CREATE_PET = gql`
  mutation CreatePet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      ...PetsFields
    }
  }
  ${PETS_FIELDS}
`;
