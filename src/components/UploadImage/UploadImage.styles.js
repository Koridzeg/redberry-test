import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  min-width: 280px;
  height: 300px;
  position: relative;
  border: 2px dashed
    ${(props) =>
      props.error ? props.theme.colors.red100 : props.theme.colors.blue900};
  border-radius: ${(props) => props.theme.radii.small};
  background-color: ${(props) =>
    props.error ? props.theme.colors.red200 : props.theme.colors.gray300};
`;

export const StyledContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  color: ${(props) =>
    props.error ? props.theme.colors.red100 : props.theme.colors.blue900};
  user-select: none;
  pointer-events: none;
`;

export const StyledUploadImage = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
`;

export const StyledPreviewContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: ${(props) => props.theme.colors.gray300};
  border-radius: ${(props) => props.theme.radii.small};
`;

export const StyledImageContainer = styled.div`
  width: 100%;
  height: 300px;
  & img {
    margin: auto;
    height: 100%;
    object-fit: contain;
  }
`;

export const StyledImageInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const StyledImageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const StyledUploadButtonContainer = styled.div`
  position: relative;
  & input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
  }
`;