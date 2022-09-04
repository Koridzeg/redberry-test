import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2rem;
  gap: 1.5rem;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: auto;
  & > * {
    flex-grow: 1;
  }
`;

export const StyledTitle = styled.h2`
  font-size: 36px;
  color: #000000;
  margin-top: 64px;
  font-family: "helvetica medium";
  text-align: center;
  @media (max-width: 390px) {
    font-size: 16px;
    color: #232323;
    margin-top: 25px;
  }
  & > img {
    position: absolute;
    top:5%;
    left: 1rem;
    transform: translateY(-50%);
  }
`;