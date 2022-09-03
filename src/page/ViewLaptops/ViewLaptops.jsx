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
    <Flex gap="2rem">
      {laptops.data.map((laptopInfo) => (
        <Card key={laptopInfo.laptop.id}>
          <Flex
            backgroundColor="#AED1EA"
            flexDirection="row"
            col="2"
          >
            <CardImage
              src={
                "https://pcfy.redberryinternship.ge/" + laptopInfo.laptop.image
              }
              alt={laptopInfo.laptop.name}
            />
            <Flex backgroundColor="#AED1EA">
              <CardUserName>{laptopInfo.user.name}</CardUserName>
              <CardLaptopName>{laptopInfo.laptop.name}</CardLaptopName>
              <CardLink to={laptopInfo.laptop.id}>See All</CardLink>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default ViewLaptops;
