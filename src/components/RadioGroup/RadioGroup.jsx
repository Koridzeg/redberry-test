import { createContext, forwardRef, useContext, useState } from "react";
import {
  StyledContainer,
  StyledFieldset,
  StyledLabel,
  StyledLegend,
  StyledRadio
} from "./RadioGroup.styles";

const RadioContext = createContext();

function useRadio() {
  const context = useContext(RadioContext);
  if (context === undefined) {
    throw new Error("<Radio/> must be used within a <RadioGroup/>");
  }
  return context;
}

const Radio = forwardRef(({ type, children, ...props }, ref) => {
  const { radioValue, handleRadioChange } = useRadio();

  return (
    <StyledContainer>
      <StyledRadio
        checked={props.value === radioValue}
        onChange={() => handleRadioChange(props.value)}
        type="radio"
        {...props}
        ref={ref}
      />
      <StyledLabel>{children}</StyledLabel>
    </StyledContainer>
  );
});

const RadioGroup = forwardRef(
  ({ children, label, value, onChange, error, ...props }, ref) => {
    const [radioValue, setRadioValue] = useState(value);

    function handleRadioChange(newValue) {
      setRadioValue(newValue);
      onChange && onChange(newValue);
    }

    return (
      <RadioContext.Provider value={{ radioValue, handleRadioChange }}>
        <StyledFieldset {...props} ref={ref}>
          <StyledLegend error={error}>{label}</StyledLegend>
          {children}
        </StyledFieldset>
      </RadioContext.Provider>
    );
  }
);

export { RadioGroup, Radio };