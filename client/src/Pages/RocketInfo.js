import { useEffect, useState } from "react";

const RocketInformation = () => {
  const [rockets, setRockets] = useState([]);

  useEffect(() => {
    fetch("/api/rockets")
      .then((response) => response.json())
      .then((data) => {
        setRockets(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">
        Rocket Information
      </h2>
      {rockets.length > 0 ? (
        <ul className="text-white">
          {rockets.map((rocket) => (
            <li key={rocket.id} className="mb-4">
              <h3 className="text-xl font-semibold">{rocket.name}</h3>
              <p>{rocket.description}</p>
              <p>Payload Capacity: {rocket.payload_capacity_kg} kg</p>
              <p>First Flight: {rocket.first_flight}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-white">Rocket information not found</p>
      )}
    </div>
  );
};

export default RocketInformation;
