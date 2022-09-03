import { getLaptops } from "../../api";
import { useAsync } from "../../hooks/use-async";
import { useEffect } from "react";
import {
  CardImage,
  CardLaptopName,
  CardLink,
  CardUserName,
  Card,
} from "../../components/Card";
import { Flex } from "../../components";
import Grid from "../../components/Grid";
import { Link } from "react-router-dom";

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
    <Grid>
      <h1>ჩანაწერების სია</h1>
      {laptops.data.map((laptopInfo) => (
        <Card key={laptopInfo.laptop.id}>
          <Flex
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
    </Grid>
  );
};

export default ViewLaptops;
