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
import { Link, useNavigate } from "react-router-dom";
import { StyledContainer, StyledTitle } from "./ViewLaptops.styles";
import LeftArrowIconUrl from "../../assets/images/left_arrow.png";

const ViewLaptops = () => {
  const { data: laptops, error, isLoading, run } = useAsync(getLaptops);
  const navigate = useNavigate();
  useEffect(() => {
    run();
  }, [run]);

  if (isLoading || (!laptops && !error)) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>an error has occurred</div>;
  }

  const onIconClick = () => {
    navigate("/");
  };

  return (
    <>
      <StyledTitle>
        <img src={LeftArrowIconUrl} onClick={onIconClick} alt="go back" />
        ჩანაწერების სია
      </StyledTitle>
      <StyledContainer>
        {laptops.data.map((laptopInfo) => (
          <Card key={laptopInfo.laptop.id}>
            <Flex flexDirection="row" flexWrap="nowrap" col="2">
              <CardImage
                src={
                  "https://pcfy.redberryinternship.ge/" +
                  laptopInfo.laptop.image
                }
                alt={laptopInfo.laptop.name}
              />
              <Flex
                flexDirection="column"
                alignItems="flex-start"
                flexWrap="nowrap"
                padding="0.5rem 0"
                col="unset"
              >
                <CardUserName>{laptopInfo.user.name}</CardUserName>
                <CardLaptopName>{laptopInfo.laptop.name}</CardLaptopName>
                <CardLink to={"/laptops/" + laptopInfo.laptop.id}>
                  მეტის ნახვა
                </CardLink>
              </Flex>
            </Flex>
          </Card>
        ))}
      </StyledContainer>
    </>
  );
};
export default ViewLaptops;
