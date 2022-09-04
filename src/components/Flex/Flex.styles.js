import styled from "styled-components"

export const StyledFlex = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${(props) => props.flexDirection ?? "row"};
  align-items: ${(props) => props.alignItems ?? "center"};
  justify-content: ${(props) => props.justifyContent ?? "space-between"};
  text-align: ${(props) => props.textAlign ?? "unset"};
  border-radius: ${(props) => props.borderRadius ?? "0.625rem"};
  border: ${(props) => props.border ?? "0"};
  border-color: ${(props) => props.borderColor ?? "white"};
  max-width: ${(props) => props.maxWidth ?? "unset"};
  background-color: ${(props) => props.backgroundColor ?? "unset"};
  flex-wrap: ${(props) => props.flexWrap ?? "wrap"};
  gap: ${(props) => props.gap ?? "0"};
  margin: ${(props) => props.margin ?? "0"};
  padding: ${(props) => props.padding ?? "0"};
  flex-grow: ${(props) => props.flexGrow ?? "0"};
  & > * {
    width: ${(props) =>
      props.col ? `calc(${100 / props.col}% - 1rem) !important` : "unset"};
  }
`;