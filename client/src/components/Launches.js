import { gql, useQuery } from "@apollo/client";
import LaunchItem from "./LaunchItem";
import MissionKey from "./MissionKey";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

const Launches = () => {
  const { data, loading, error } = useQuery(LAUNCHES_QUERY);
  error && console.error(error);
  return (
    <div>
      <h1 className="display-4 my-3">Launches</h1>
      <MissionKey />
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        data.launches.map((launch, index) => (
          <LaunchItem key={`${launch.flight_number}${index}`} launch={launch} />
        ))
      )}
    </div>
  );
};

export default Launches;
