import styled from "styled-components";

export const StyledFlex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.flexDirection ?? "row"};
  align-items: ${(props) => props.alignItems ?? "center"};
  justify-content: ${(props) => props.justifyContent ?? "space-between"};
  flex-wrap: ${(props) => props.flexWrap ?? "wrap"};
  gap: ${(props) => props.gap ?? "0"};
  margin: ${(props) => props.margin ?? "0"};
  flex-grow: ${(props) => props.flexGrow ?? "0"};
  & > * {
    width: ${(props) =>
      props.col ? `calc(${100 / props.col}% - 1rem)` : "100%"};
  }
`;