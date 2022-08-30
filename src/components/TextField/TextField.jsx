import { forwardRef } from "react";
import {
  StyledContainer,
  StyledHint,
  StyledLabel,
  StyledTextField
} from "./TextField.styles";

const TextField = forwardRef(
  ({ type, label, hint, error = false, ...props }, ref) => {
    return (
      <StyledContainer>
        {label && <StyledLabel error={error}>{label}</StyledLabel>}
        <StyledTextField type="text" error={error} {...props} ref={ref} />
        {hint && <StyledHint error={error}>{hint}</StyledHint>}
      </StyledContainer>
    );
  }
);

export default TextField;