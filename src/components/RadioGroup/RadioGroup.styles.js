import styled from "styled-components";

export const StyledFieldset = styled.fieldset`
  display: flex;
  flex-direction: ${(props) =>
    props.direction === "vertical" ? "column" : "row"};
  gap: 2rem;
  border: none;
`;

export const StyledLegend = styled.legend`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: bold;
  text-transform: capitalize;
  color: ${(props) => (props.error ? props.theme.colors.red100 : "initial")};
  & img {
    width: 22.11px;
    height: 20px;
  }
`;

export const StyledContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const StyledLabel = styled.p`
  white-space: nowrap;
`;

export const StyledRadio = styled.input`
  margin: 0;
  width: 20px;
  height: 20px;
  accent-color: ${(props) => props.theme.colors.blue700};
`;
