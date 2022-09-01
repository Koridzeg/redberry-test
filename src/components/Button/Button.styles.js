import styled from "styled-components";

export const StyledButton = styled.button`
  min-width: 100px;
  max-height: ${(props) => props.theme.sizes.inputHeight};
  padding: 15px 60px;
  color: white;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: bold;
  white-space: nowrap;
  background-color: ${(props) => props.theme.colors.blue100};
  border-radius: ${(props) => props.theme.radii.small};
  transition: background-color 100ms ease-in-out;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.blue200};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.blue300};
  }
`;