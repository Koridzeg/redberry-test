import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  position: relative;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  cursor: not-allowed;
`;

export const StyledSelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 280px;
  width: 100%;
  height: ${(props) => props.theme.sizes.inputHeight};
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.gray200};
  border-radius: ${(props) => props.theme.radii.small};
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  border: ${(props) =>
    props.error ? "2px solid " + props.theme.colors.red100 : "none"};
    pointer-events: ${(props) => (props.disabled ? "none" : "all")};
  & img {
    width: 16px;
    height: 10px;
  }
`;

export const StyledSelectPopover = styled.div`
  position: absolute;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white100};
  border-radius: ${(props) => props.theme.radii.small};
  filter: drop-shadow(0px 4px 34px rgba(0, 0, 0, 0.25));
  z-index: ${(props) => props.theme.zIndices.popover};
  & > :first-child {
    border-top-left-radius: ${(props) => props.theme.radii.small};
    border-top-right-radius: ${(props) => props.theme.radii.small};
  }
  & > :last-child {
    border-bottom-left-radius: ${(props) => props.theme.radii.small};
    border-bottom-right-radius: ${(props) => props.theme.radii.small};
  }
`;

export const StyledSelectItem = styled.div`
  padding: 0.5rem 1rem;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.blue800};
  }
`;
