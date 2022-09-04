import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLaptopById } from "../../api";
import { useAsync } from "../../hooks/use-async";
import { StyledContainer, StyledRow } from "./ViewLaptopDetails.styles";
import Divider from "../../components/Divider/Divider";
import Flex from "../../components/Flex/Flex";
import { SMALL_BREAKPOINT } from "../../style/theme";

const ViewLaptopDetails = () => {
  const { laptop_id } = useParams();
  const { data: laptopInfo, error, isLoading, run } = useAsync(getLaptopById);

  useEffect(() => {
    run(laptop_id);
  }, [laptop_id, run]);

  if (isLoading || (!laptopInfo && !error)) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>an error has occurred</div>;
  }

  console.log(laptopInfo);

  return (
    <StyledContainer>
      <h2>ლეპტოპის ინფო</h2>
      <Flex col={SMALL_BREAKPOINT < window.innerWidth && 2}>
        <img
          src={
            "https://pcfy.redberryinternship.ge/" + laptopInfo.data.laptop.image
          }
          alt="laptop"
        />
        <Flex>
          <StyledRow>
            <p>სახელი:</p>
            <p>
              {laptopInfo.data.user.name} {laptopInfo.data.user.surname}
            </p>
          </StyledRow>
          <StyledRow>
            <p>თიმი:</p>
            <p>{laptopInfo.data.user.team_id}</p>
          </StyledRow>
          <StyledRow>
            <p>პოზიცია:</p>
            <p>{laptopInfo.data.user.position_id}</p>
          </StyledRow>
          <StyledRow>
            <p>მეილი:</p>
            <p>{laptopInfo.data.user.email}</p>
          </StyledRow>
          <StyledRow>
            <p>ტელ. ნომერი:</p>
            <p>{laptopInfo.data.user.phone_number}</p>
          </StyledRow>
        </Flex>
      </Flex>
      <Divider />
      <Flex col={SMALL_BREAKPOINT < window.innerWidth && 2}>
        <StyledRow>
          <p>ლეპტოპის სახელი:</p>
          <p>{laptopInfo.data.laptop.name}</p>
        </StyledRow>
        <StyledRow>
          <p>ლეპტოპის ბრენდი:</p>
          <p>{laptopInfo.data.laptop.brand_id}</p>
        </StyledRow>
        <StyledRow>
          <p>RAM:</p>
          <p>{laptopInfo.data.laptop.ram}</p>
        </StyledRow>
        <StyledRow>
          <p>მეხსიერების ტიპი:</p>
          <p>{laptopInfo.data.laptop.hard_drive_type}</p>
        </StyledRow>
        <StyledRow>
          <p>CPU:</p>
          <p>{laptopInfo.data.laptop.cpu.name}</p>
        </StyledRow>
        <StyledRow>
          <p>CPU-ს ბირთვი:</p>
          <p>{laptopInfo.data.laptop.cpu.cores}</p>
        </StyledRow>
        <StyledRow>
          <p>CPU-ს ნაკადი:</p>
          <p>{laptopInfo.data.laptop.cpu.threads}</p>
        </StyledRow>
      </Flex>
      <Divider />
      <Flex col={SMALL_BREAKPOINT < window.innerWidth && 2}>
        <StyledRow>
          <p>მდგომარეობა:</p>
          <p>{laptopInfo.data.laptop.state}</p>
        </StyledRow>
        <StyledRow>
          <p>ლეპტოპის ფასი:</p>
          <p>{laptopInfo.data.laptop.price}</p>
        </StyledRow>
        {laptopInfo.data.laptop.purchase_date && (
          <StyledRow>
            <p>შეძენის რიცხვი:</p>
            <p>{laptopInfo.data.laptop.purchase_date}</p>
          </StyledRow>
        )}
      </Flex>
    </StyledContainer>
  );
};

export default ViewLaptopDetails;