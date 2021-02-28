import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import PetsList from "../components/PetsList";
import NewPetModal from "../components/NewPetModal";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { FETCH_PETS, CREATE_PET } from "../graphql/queries";

const getOptimisticId = () => Math.floor(Math.random() * 1000000000);
const getOptimisticImg = () => "https://via.placeholder.com/300";
const getOptimisticBoolean = () => false;
const getOptimisticOwnerAge = () => Math.floor(Math.random() * 100);

export default function Pets() {
  const [modal, setModal] = useState(false);
  const query = useQuery(FETCH_PETS);
  const [createPet, mutation] = useMutation(CREATE_PET, {
    update(cache, { data: { addPet } }) {
      const { pets } = cache.readQuery({ query: FETCH_PETS });

      cache.writeQuery({
        query: FETCH_PETS,
        data: {
          pets: [addPet, ...pets],
        },
      });
    },
  });

  const { loading } = query;
  const error = query.error || mutation.error;

  if (loading) return <Loader />;
  if (error) return <Error error={error} />;

  const { pets } = query.data;

  const onSubmit = (input) => {
    const { name, type } = input;

    createPet({
      variables: {
        newPet: {
          name,
          type,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        addPet: {
          __typename: "Pet",
          id: getOptimisticId(),
          name,
          type,
          img: getOptimisticImg(),
          isVaccinated: getOptimisticBoolean(),
          owner: {
            __typename: "User",
            id: getOptimisticId(),
            age: getOptimisticOwnerAge(),
          },
        },
      },
    });

    setModal(false);
  };

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />;
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={pets} />
      </section>
    </div>
  );
}
