import { getLaptops } from "../../api";
import { useAsync } from "../../hooks/use-async";
import { useEffect } from "react";
import {
  CardImage,
  CardLaptopName,
  CardLink,
  CardUserName,
  Card,
  Title
} from "../../components/Card";
import { Flex } from "../../components";
import Grid from "../../components/Grid";
import { Link } from "react-router-dom";
import {StyledContainer} from "./ViewLaptops.styles"

const ViewLaptops = () => {
  const { data: laptops, error, isLoading, run } = useAsync(getLaptops);

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
    <>

    <StyledContainer>
      <Title> ჩანაწერების სია </Title>
      {laptops.data.map((laptopInfo) => (
        <Card key={laptopInfo.laptop.id}>
          <Flex
            textAlign="center"
            flexWrap="no-wrap"
            backgroundColor="#EAFAFF"
            flexDirection="row"
            col="2"
          >
            <CardImage
              src={
                "https://pcfy.redberryinternship.ge/" + laptopInfo.laptop.image
              }
              alt={laptopInfo.laptop.name}
            />
            <Flex backgroundColor="#EAFAFF">
              <CardUserName>{laptopInfo.user.name}</CardUserName>
              <CardLaptopName>{laptopInfo.laptop.name}</CardLaptopName>
              <Link to={laptopInfo.laptop.id}>
                {" "}
                <p> მეტის ნახვა </p>{" "}
              </Link>
            </Flex>
          </Flex>
        </Card>
      ))}
    </StyledContainer>
    </>
  );
};

export default ViewLaptops;
