import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "../../hooks/use-async";
import { StyledContainer, StyledTitle } from "./ViewLaptopDetails.styles";

const ViewLaptopDetails = () => {

  const { laptop_id } = useParams();

  const LAPTOPID = laptop_id

  const { data: laptops, error, isLoading, run } = useAsync();

  useEffect(() => {
    run();
  }, [run]);

  if (isLoading || (!laptops && !error)) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>an error has occurred</div>;
  }

  return (
    <StyledContainer>
      <StyledTitle>ლეპტოპის ინფო</StyledTitle>
    </StyledContainer>
  );
};

export default ViewLaptopDetails
