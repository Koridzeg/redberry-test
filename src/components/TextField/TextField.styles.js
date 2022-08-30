import styled from "styled-components";

export const StyledTextField = styled.input`
  width: 280px;
  height: ${(props) => props.theme.sizes.inputHeight};
  border-radius: ${(props) => props.theme.radii.small};
  border: 1.8px solid
    ${(props) =>
      props.error ? props.theme.colors.red100 : props.theme.colors.blue400};
  padding: 1rem;
  &:focus {
    outline: none;
    background-color: ${(props) => props.theme.colors.blue600};
    border-color: ${(props) => props.theme.colors.blue500};
  }
`;

export const StyledContainer = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const StyledLabel = styled.p`
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: bold;
  text-transform: capitalize;
  color: ${(props) => (props.error ? props.theme.colors.red100 : "initial")};
`;

export const StyledHint = styled.p`
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: light;
  text-transform: capitalize;
  color: ${(props) =>
    props.error ? props.theme.colors.red100 : props.theme.colors.gray100};
`;