import { gql, useQuery } from "@apollo/client";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      mission_name
      launch_year
      launch_date_local
      launch_success
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = ({ match: { params } }) => {
  let { flight_number } = params;
  flight_number = parseInt(flight_number);
  const { error, data, loading } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number },
  });
  error && console.error(error);

  return loading ? (
    <h4>Loading ...</h4>
  ) : (
    <Fragment>
      <h1 className="display-4 my-3">
        <span className="text-dark">Mission: </span> {data.launch.mission_name}
      </h1>
      <h4 className="mb-3">Launch Details</h4>
      <ul className="list-group">
        <li className="list-group-item">
          Flight Number: {data.launch.flight_number}
        </li>
        <li className="list-group-item">
          Launch Year: {data.launch.launch_year}
        </li>
        <li className="list-group-item">
          Launch Successful:{" "}
          <span
            className={
              data.launch.launch_success ? "text-success" : "text-danger"
            }
          >
            {data.launch.launch_success ? "Yes" : "No"}
          </span>
        </li>
      </ul>
      <h4 className="my-3">Rocket Details</h4>
      <ul className="list-group">
        <li className="list-group-item">Rocket ID: {data.launch.rocket.rocket_id}</li>
        <li className="list-group-item">Rocket Name: {data.launch.rocket.rocket_name}</li>
        <li className="list-group-item">Rocket Type: {data.launch.rocket.rocket_type}</li>
      </ul>
      <hr />
      <Link to="/" className="btn btn-secondary">Back</Link>
    </Fragment>
  );
};

export default Launch;
