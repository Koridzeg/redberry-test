import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  justify-content: space-between;
  img {
    margin-top: 2rem;
  }
  p {
    color: ${(props) => props.theme.colors.blue1000};
  }
  a {
    text-decoration: none;
  }
  h2 {
    text-align: center;
  }
`;