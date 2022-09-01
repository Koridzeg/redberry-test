import { Button } from "../../components";
import LogoIconUrl from "../../assets/images/logo.png";
import LandingMobileImageUrl from "../../assets/images/landing_mobile.png";
import LandingDesktopImageUrl from "../../assets/images/landing_desktop.png";
import theme from "../../style/theme";
import { StyledButtonContainer, StyledContainer } from "./Landing.styles";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <StyledContainer>
      <img src={LogoIconUrl} alt="logo" />
      <picture>
        <source
          media={`(max-width: ${theme.breakpoints.small})`}
          srcSet={LandingMobileImageUrl}
        />
        <source
          media={`(min-width: ${theme.breakpoints.small})`}
          srcSet={LandingDesktopImageUrl}
        />
        <img src={LandingMobileImageUrl} alt="landing hero" />
      </picture>
      <StyledButtonContainer>
        <Link to="create">
          <Button>ჩანაწერის დამატება</Button>
        </Link>
        <Link to="laptops">
          <Button>ჩანაწერების სია</Button>
        </Link>
      </StyledButtonContainer>
    </StyledContainer>
  );
};

export default Landing