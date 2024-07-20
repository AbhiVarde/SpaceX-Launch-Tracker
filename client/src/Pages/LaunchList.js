import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LaunchList = () => {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    fetch("/api/launches")
      .then((response) => response.json())
      .then((data) => {
        setLaunches(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">
        Previous Launches
      </h2>
      {launches.length > 0 ? (
        <ul className="text-white">
          {launches.map((launch) => (
            <li key={launch.flight_number} className="mb-2">
              <Link
                to={`/launch/${launch.flight_number}`}
                className="underline"
              >
                {launch.name}
              </Link>
              {" - "}
              {new Date(launch.date_utc).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-white">No previous launches found</p>
      )}
    </div>
  );
};

export default LaunchList;
