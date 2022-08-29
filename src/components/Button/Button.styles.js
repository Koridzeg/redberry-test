import styled from "styled-components";

export const StyledButton = styled.button`
  all: unset;
  min-width: 100px;
  padding: 18px 60px;
  color: white;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: bold;
  background-color: ${(props) => props.theme.colors.blue100};
  border-radius: ${(props) => props.theme.radii.small};
  transition: background-color 100ms ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.blue200};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.blue300};
  }
`;