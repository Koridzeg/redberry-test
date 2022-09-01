import styled from "styled-components";

export const StyledContainer = styled.div`
  position: relative;
`;

export const StyledSelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 280px;
  height: ${(props) => props.theme.sizes.inputHeight};
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.gray200};
  border-radius: ${(props) => props.theme.radii.small};
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  border: ${(props) =>
    props.error ? "2px solid " + props.theme.colors.red100 : "none"};
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