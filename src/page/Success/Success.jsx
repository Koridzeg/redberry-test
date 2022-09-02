import { StyledContainer } from "./Success.styles";
import SuccessImgUrl from "../../assets/images/passed.png";
import { Button, Flex } from "../../components";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <StyledContainer>
      <Flex
        flexDirection="column"
        justifyContent="center"
        gap="1rem"
        flexGrow="1"
      >
        <img src={SuccessImgUrl} alt="success" />
        <h2>
          ჩანაწერი <br />
          დამატებულია!
        </h2>
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="center"
        gap="1rem"
        margin="0 0 2rem 0"
      >
        <Link to="/laptops">
          <Button>სიაში გადაყვანა</Button>
        </Link>
        <Link to="/">
          <p>მთავარი</p>
        </Link>
      </Flex>
    </StyledContainer>
  );
};

export default Success;
