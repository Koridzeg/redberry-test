import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  max-height: 1000px;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  & > img:first-child {
    margin-top: 2rem;
  }
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  & * {
    width: 100%;
  }
`;