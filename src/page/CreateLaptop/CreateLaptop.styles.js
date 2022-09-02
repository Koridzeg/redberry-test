import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.gray300};
`;

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  padding: 1rem;
  & > a,
  & > img {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }
  & h3 {
    font-weight: bold;
  }
  & p {
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;

export const StyledStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  height: 100%;
  padding: 2rem 1rem 3rem;
  background-color: ${(props) => props.theme.colors.white100};
  border-top-left-radius: ${(props) => props.theme.radii.small};
  border-top-right-radius: ${(props) => props.theme.radii.small};
`;