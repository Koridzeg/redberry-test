import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLaptopById } from "../../api";
import { useAsync } from "../../hooks/use-async";
import {
  StyledContainer,
  StyledImg,
  StyledRow,
} from "./ViewLaptopDetails.styles";
import Divider from "../../components/Divider/Divider";
import Flex from "../../components/Flex/Flex";
import theme, { SMALL_BREAKPOINT } from "../../style/theme";
import LeftArrowIconUrl from "../../assets/images/left_arrow.png";
import LeftArrowDesktop from "../../assets/images/desktopback.png";

const ViewLaptopDetails = () => {
  const { laptop_id } = useParams();
  const { data: laptopInfo, error, isLoading, run } = useAsync(getLaptopById);
  const navigate = useNavigate();

  useEffect(() => {
    run(laptop_id);
  }, [laptop_id, run]);

  if (isLoading || (!laptopInfo && !error)) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>an error has occurred</div>;
  }

  return (
    <>
      <StyledImg>
      <picture onClick={() => navigate('/laptops')}>
          <source
            media={`(max-width: ${theme.breakpoints.small})`}
            srcSet={LeftArrowIconUrl}
          />
          <source
            media={`(min-width: ${theme.breakpoints.small})`}
            srcSet={LeftArrowDesktop}
          />
          <img src={LeftArrowIconUrl} alt="back" />
        </picture>
      </StyledImg>
      <StyledContainer>
        <h2>ლეპტოპის ინფო</h2>
        <Flex col={SMALL_BREAKPOINT < window.innerWidth && 2}>
          <img
            src={
              "https://pcfy.redberryinternship.ge/" +
              laptopInfo.data.laptop.image
            }
            alt="laptop"
          />
          <Flex>
            <StyledRow>
              <h3>სახელი:</h3>
              <p>
                {laptopInfo.data.user.name} {laptopInfo.data.user.surname}
              </p>
            </StyledRow>
            <StyledRow>
              <h3>თიმი:</h3>
              <p>{laptopInfo.data.user.team_id}</p>
            </StyledRow>
            <StyledRow>
              <h3>პოზიცია:</h3>
              <p>{laptopInfo.data.user.position_id}</p>
            </StyledRow>
            <StyledRow>
              <h3>მეილი:</h3>
              <p>{laptopInfo.data.user.email}</p>
            </StyledRow>
            <StyledRow>
              <h3>ტელ. ნომერი:</h3>
              <p>{laptopInfo.data.user.phone_number}</p>
            </StyledRow>
          </Flex>
        </Flex>
        <Divider />
        <Flex col={SMALL_BREAKPOINT < window.innerWidth && 2}>
          <StyledRow>
            <h3>ლეპტოპის სახელი:</h3>
            <p>{laptopInfo.data.laptop.name}</p>
          </StyledRow>
          <StyledRow>
            <h3>ლეპტოპის ბრენდი:</h3>
            <p>{laptopInfo.data.laptop.brand_id}</p>
          </StyledRow>
          <StyledRow>
            <h3>RAM:</h3>
            <p>{laptopInfo.data.laptop.ram}</p>
          </StyledRow>
          <StyledRow>
            <h3>მეხსიერების ტიპი:</h3>
            <p>{laptopInfo.data.laptop.hard_drive_type}</p>
          </StyledRow>
          <StyledRow>
            <h3>CPU:</h3>
            <p>{laptopInfo.data.laptop.cpu.name}</p>
          </StyledRow>
          <StyledRow>
            <h3>CPU-ს ბირთვი:</h3>
            <p>{laptopInfo.data.laptop.cpu.cores}</p>
          </StyledRow>
          <StyledRow>
            <h3>CPU-ს ნაკადი:</h3>
            <p>{laptopInfo.data.laptop.cpu.threads}</p>
          </StyledRow>
        </Flex>
        <Divider />
        <Flex col={SMALL_BREAKPOINT < window.innerWidth && 2}>
          <StyledRow>
            <h3>მდგომარეობა:</h3>
            <p>{laptopInfo.data.laptop.state}</p>
          </StyledRow>
          <StyledRow>
            <h3>ლეპტოპის ფასი:</h3>
            <p>{laptopInfo.data.laptop.price}₾</p>
          </StyledRow>
          {laptopInfo.data.laptop.purchase_date && (
            <StyledRow>
              <h3>შეძენის რიცხვი:</h3>
              <p>{laptopInfo.data.laptop.purchase_date}</p>
            </StyledRow>
          )}
        </Flex>
      </StyledContainer>
    </>
  );
};

export default ViewLaptopDetails;
