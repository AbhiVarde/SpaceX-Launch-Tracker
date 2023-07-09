import { useEffect, useState } from "react";
import {
  BsFillInfoCircleFill,
  BsFillRocketTakeoffFill,
  BsFillCalendarDateFill,
} from "react-icons/bs";
import { FaTrafficLight } from "react-icons/fa";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import LaunchDetails from "./Pages/Details";
import About from "./Pages/About";
import UpcomingLaunches from "./Pages/Launches";
import RocketInformation from "./Pages/RocketInfo";
import LaunchList from "./Pages/LaunchList";

function App() {
  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/launch")
      .then((response) => response.json())
      .then((data) => {
        setLaunch(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Router>
      <div
        className="bg-black bg-center bg-no-repeat min-h-screen flex
         flex-grow-0 flex-shrink-0 flex-col items-center justify-center font-Space"
      >
        {" "}
        <div className="container z-30 mx-auto p-8 bg-transparent rounded-lg shadow-lg backdrop-filter backdrop-blur-sm max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center text-[#00d4ff]">
            SpaceX Launch Tracker
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 text-center text-gray-300">
            Bringing you the latest updates on SpaceX launches
          </p>
          <nav className="mb-6 text-center">
            <ul className="flex flex-wrap justify-center">
              <li className="mr-4">
                <NavLink
                  exact
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-[#00d4ff]" : "text-white underline"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="mr-4">
                <NavLink
                  to="/launches"
                  className={({ isActive }) =>
                    isActive ? "text-[#00d4ff]" : "text-white underline"
                  }
                >
                  Launches
                </NavLink>
              </li>
              <li className="mr-4">
                <NavLink
                  to="/upcoming"
                  className={({ isActive }) =>
                    isActive ? "text-[#00d4ff]" : "text-white underline"
                  }
                >
                  Upcoming Launches
                </NavLink>
              </li>
              <li className="mr-4">
                <NavLink
                  to="/rockets"
                  className={({ isActive }) =>
                    isActive ? "text-[#00d4ff]" : "text-white underline"
                  }
                >
                  Rocket Information
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-[#00d4ff]" : "text-white underline"
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={<Home launch={launch} loading={loading} />}
            />
            <Route path="/launches" element={<LaunchList />} />
            <Route path="/launch/:id" element={<LaunchDetails />} />
            <Route path="/upcoming" element={<UpcomingLaunches />} />
            <Route path="/rockets" element={<RocketInformation />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <footer className="fixed text-xs md:text-base bottom-0 left-0 right-0 my-6 text-center font-Space text-white z-20">
          Follow me for more updates:{" "}
          <a
            href="https://abhivarde.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            @AbhiVarde
          </a>
        </footer>
      </div>
      <video
        src="https://assets-global.website-files.com/602ca6bcbe64eee6c15a1b47/6045e72c83b47d9a75fdb01e_Footer%20animation%20(400px)-transcode.mp4"
        autoPlay
        muted
        loop
        className="w-full md:h-auto "
        style={{ position: "fixed", bottom: 0, left: 0, zIndex: 10 }}
      />
    </Router>
  );
}

function Home({ launch, loading }) {
  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  } else if (launch) {
    const Details = launch.details;
    return (
      <div className="text-center text-white">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
          {launch.name}
        </h2>
        <p className="mb-2">
          <BsFillRocketTakeoffFill className="inline-block text-xl align-middle mr-2" />
          Flight Number: {launch.flight_number}
        </p>
        <p className="mb-2">
          <BsFillCalendarDateFill className="inline-block text-xl align-middle mr-2 " />
          Date: {new Date(launch.date_utc).toLocaleDateString()}
        </p>
        <p className="mb-2">
          <BsFillInfoCircleFill className="inline-block text-xl align-middle mr-2" />
          Details: {Details ? Details : "Unavailable"}
        </p>
        <p className="mb-2">
          <FaTrafficLight className="inline-block text-xl align-middle mr-2" />
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
        <p className="mt-6 text-white">
          Follow:
          <a
            className="underline ml-1"
            href="https://twitter.com/spacex"
            target="_blank"
            rel="noopener noreferrer"
          >
            @SpaceX
          </a>{" "}
        </p>
      </div>
    );
  } else {
    return <p className="text-center text-white">No launch data available</p>;
  }
}

export default App;
