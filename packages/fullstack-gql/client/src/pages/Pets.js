import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import PetsList from "../components/PetsList";
import NewPetModal from "../components/NewPetModal";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { FETCH_PETS, CREATE_PET } from "../graphql/queries";

export default function Pets() {
  const [modal, setModal] = useState(false);
  const query = useQuery(FETCH_PETS);
  const [createPet, mutation] = useMutation(CREATE_PET);

  const loading = query.loading || mutation.loading;
  const error = query.error || mutation.error;

  if (loading) return <Loader />;
  if (error) return <Error error={error} />;

  const newPet = mutation.data && mutation.data.addPet;
  const pets = [...query.data.pets];

  if (newPet) pets.push(newPet);

  const onSubmit = (input) => {
    const { name, type } = input;

    createPet({
      variables: {
        newPet: {
          name,
          type,
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
