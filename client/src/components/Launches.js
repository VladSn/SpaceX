import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { LaunchItem } from "./LaunchItem";
import Loader from "./Loader";
import MissionKey from "./MissionKey";

const LAUNCHES_QUERY = gql`
  query launches {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

export const Launches = () => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);
  const launches = JSON.parse(localStorage.getItem("Launches") || []);

  if (loading && !launches) return <Loader />;
  //if (error) console.log(error);
  if (!launches.length) {
    localStorage.setItem("Launches", JSON.stringify(data.launches));
  }

  return (
    <div>
      <h1 className="display-4 my-3">Launches</h1>
      <MissionKey />
      {launches.map((launch) => (
        <LaunchItem key={launch.flight_number} launch={launch} />
      ))}
    </div>
  );
};
