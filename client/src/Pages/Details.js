import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LaunchDetails = () => {
  const { id } = useParams();
  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/launch/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLaunch(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div>
      {loading ? (
        <p className="text-center text-white">Loading...</p>
      ) : launch ? (
        <div className="text-center text-white">
          <h2 className="text-2xl font-semibold mb-2">{launch.name}</h2>
          <p className="mb-2">Flight Number: {launch.flight_number}</p>
          <p className="mb-2">
            Date: {new Date(launch.date_utc).toLocaleDateString()}
          </p>
          <p className="mb-2">Details: {launch.details}</p>
          <p className="mb-2">
            Status:{" "}
            {launch.success ? (
              <span role="img" aria-label="Success">
                ✅
              </span>
            ) : (
              <span role="img" aria-label="Failure">
                ❌
              </span>
            )}
          </p>
        </div>
      ) : (
        <p className="text-center text-white">Launch details not found</p>
      )}
    </div>
  );
};

export default LaunchDetails;
