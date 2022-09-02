import styled from "styled-components";

export const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.gray200};
  margin: 1rem 0;
`;