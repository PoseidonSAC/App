import { useTravel } from "../../context/travel";

export const TravelPage = () => {
  const { travels } = useTravel();
  return (
    <div>
      <h1>Travel Page</h1>
    </div>
  );
};
