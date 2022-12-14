import { forwardRef, useState } from "react";
import {
  StyledContainer,
  StyledContent,
  StyledImageContainer,
  StyledImageInfo,
  StyledImageInfoContainer,
  StyledPreviewContainer,
  StyledUploadButtonContainer,
  StyledUploadImage,
} from "./UploadImage.styles";
import Button from "../Button";
import CameraIconUrl from "../../assets/images/camera.png";
import WarningIconUrl from "../../assets/images/warning.png";
import SuccessIconUrl from "../../assets/images/success.png";
import { SMALL_BREAKPOINT } from "../../style/theme";

const formatFileSize = function (bytes) {
  const sufixes = ["B", "kB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sufixes[i]}`;
};

const UploadImage = forwardRef(
  ({ type, accept, onChange, error, defaultImage, ...props }, ref) => {
    const [image, setImage] = useState();
    const previewUrl = image && URL.createObjectURL(image);

    function handleAddImage(event) {
      setImage(event.target.files[0]);
      onChange && onChange(event);
    }

    if (image) {
      return (
        <StyledPreviewContainer>
          <StyledImageContainer>
            <img src={previewUrl} alt="laptop" />
          </StyledImageContainer>
          <StyledImageInfoContainer>
            <StyledImageInfo>
              <img src={SuccessIconUrl} alt="success" />
              <div>{image.name}</div>
              <div>{formatFileSize(image.size)}</div>
            </StyledImageInfo>
            <StyledUploadButtonContainer>
              <Button>თავიდან ატვირთე</Button>
              <StyledUploadImage
                type="file"
                accept="image/*"
                onChange={handleAddImage}
                ref={ref}
                {...props}
              />
            </StyledUploadButtonContainer>
          </StyledImageInfoContainer>
        </StyledPreviewContainer>
      );
    }

    return (
      <StyledContainer error={error}>
        <StyledUploadImage
          type="file"
          accept="image/*"
          onChange={handleAddImage}
          ref={ref}
          {...props}
        />
        <StyledContent error={error}>
          {error ? (
            <img src={WarningIconUrl} alt="warning" />
          ) : (
            window.innerWidth <= SMALL_BREAKPOINT && (
              <img src={CameraIconUrl} alt="camera" />
            )
          )}
          ჩააგდე ან ატვირთე <br />
          ლეპტოპის ფოტო
          {window.innerWidth > SMALL_BREAKPOINT && <Button>ატვირთე</Button>}
        </StyledContent>
      </StyledContainer>
    );
  }
);

export default UploadImage;
