import React, { useState } from "react";

function PlantCard({ plant }) {
  const [soldOut, setSoldOut] = useState(false);

  const handleToggleStock = () => {
    setSoldOut((current) => !current);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {soldOut ? (
        <button onClick={handleToggleStock}>Out of Stock</button>
      ) : (
        <button className="primary" onClick={handleToggleStock}>
          In Stock
        </button>
      )}
    </li>
  );
}

export default PlantCard;
