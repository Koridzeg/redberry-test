import styled from "styled-components";

export const StyledFlex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.flexDirection ?? "row"};
  align-items: ${(props) => props.alignItems ?? "center"};
  justify-content: ${(props) => props.justifyContent ?? "space-between"};
  flex-wrap: ${(props) => props.justifyContent ?? "wrap"};
  margin: ${(props) => props.margin ?? "0"};
`;