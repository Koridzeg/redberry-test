import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: ${(props) => props.theme.colors.gray300};
  & > img {
    margin: 3rem auto;
  }
  & button:last-child {
    padding: 15px;
  }
`;

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  padding: 1rem;
  & > a,
  & > picture {
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
  max-width: 1226px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignItems ?? "flex-end"};
  gap: 1rem;
  height: 100%;
  padding: 2rem 1rem 3rem;
  background-color: ${(props) => props.theme.colors.white100};
  border-radius: ${(props) => props.theme.radii.small};

  & > * {
    gap: 1rem;
  }

  & > * > a {
    text-decoration: none;
    & p:last-child {
      color: ${(props) => props.theme.colors.blue1000};
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.small}) {
    padding: 5rem 10rem;
    gap: 2rem;
  }
`;