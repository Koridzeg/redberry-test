import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
  h2 {
    font-size: 34px;
    color: #000000;
    margin: 64px 0;
    @media (max-width: 390px) {
      font-size: 16px;
      color: #232323;
      margin-top: 25px;
    }
  }
  img {
    width: 300px !important;
    margin-bottom: 2rem;
  }

  p {
    color: #797979;
  }

  h3 {
    font-size: 14px;
  }
`;

export const StyledRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > p:last-child {
    font-size: 14px;
  }
`;

export const StyledImg = styled.div`
  & > picture {
    position: absolute;
    top: 5%;
    left: 1rem;
    transform: translateY(-50%);
  }
`;
