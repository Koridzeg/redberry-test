import {
  StyledContainer,
  StyledImage,
  StyledLaptopName,
  StyledLink,
  StyledUserName
} from "./Card.styles";

const Card = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

const CardImage = ({ src, alt }) => {
  return <StyledImage src={src} alt={alt} />;
};

const CardUserName = ({ children }) => {
  return <StyledUserName>{children}</StyledUserName>;
};

const CardLaptopName = ({ children }) => {
  return <StyledLaptopName>{children}</StyledLaptopName>;
};

const CardLink = ({ to, children }) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

export { Card, CardImage, CardUserName, CardLaptopName, CardLink };