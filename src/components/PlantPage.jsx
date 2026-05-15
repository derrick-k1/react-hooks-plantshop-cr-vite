import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then(setPlants)
      .catch((error) => console.error("Error loading plants:", error));
  }, []);

  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((createdPlant) => {
        setPlants((currentPlants) => [...currentPlants, createdPlant]);
      })
      .catch((error) => console.error("Error adding plant:", error));
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const visiblePlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <PlantList plants={visiblePlants} />
    </main>
  );
}

export default PlantPage;
