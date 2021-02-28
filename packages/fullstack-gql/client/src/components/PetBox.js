import React from "react";

const PetBox = ({ pet }) => {
  const { id, name, type, img, isVaccinated, owner } = pet;

  return (
    <div className="pet">
      <figure>
        <img src={img + `?pet=${id}`} alt="" />
      </figure>
      <div className="pet-name">{name}</div>
      <div className="pet-type">{type}</div>
      <div
        className="pet-vaccinated"
        style={{ color: isVaccinated ? "black" : "red" }}
      >
        {isVaccinated ? "" : "NOT "}VACCINATED
      </div>
      <hr />
      <div className="pet-owner">
        <div className="pet-owner-id">
          <b>Owner ID:&nbsp;</b>
          {owner.id}
        </div>
        <div className="pet-owner-age">
          <b>Owner age:&nbsp;</b>
          {owner.age}
        </div>
      </div>
    </div>
  );
};

export default PetBox;
