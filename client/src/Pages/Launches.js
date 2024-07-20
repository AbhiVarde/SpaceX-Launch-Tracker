import { useEffect, useState } from "react";

const UpcomingLaunches = () => {
  const [upcomingLaunches, setUpcomingLaunches] = useState([]);

  useEffect(() => {
    fetch("/api/launches/upcoming")
      .then((response) => response.json())
      .then((data) => {
        setUpcomingLaunches(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">
        Upcoming Launches
      </h2>
      {upcomingLaunches.length > 0 ? (
        <ul className="text-white">
          {upcomingLaunches.map((launch) => (
            <li key={launch.flight_number} className="mb-2">
              {launch.name} - {new Date(launch.date_utc).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-white">No upcoming launches found</p>
      )}
    </div>
  );
};

export default UpcomingLaunches;
