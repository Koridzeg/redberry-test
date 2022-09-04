import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 360px;
  height: 120px;
  padding: 0.5rem;
  background-color: #eafaff;
  border: 1px solid;
  border-color: #aed1ea;
  flex-direction: row;
  border-radius: ${(props) => props.theme.radii.small};
`;

export const StyledImage = styled.img`
  height: 100%;
  object-fit: scale-down;
  border-radius: ${(props) => props.theme.radii.small};
`;

export const StyledUserName = styled.p``;

export const StyledLaptopName = styled.p`
  color: #2e2e2e;
  font-size: 18px;
`;

export const StyledLink = styled(Link)`
  color: #4386a9;
  font-size: 16px;
`;