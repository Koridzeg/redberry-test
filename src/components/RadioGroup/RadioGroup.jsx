import { createContext, forwardRef, useContext, useState } from "react";
import {
  StyledContainer,
  StyledFieldset,
  StyledLabel,
  StyledLegend,
  StyledRadio,
} from "./RadioGroup.styles";
import WarningIconUrl from "../../assets/images/warning.png";

const RadioContext = createContext();

function useRadio() {
  const context = useContext(RadioContext);
  if (context === undefined) {
    throw new Error("<Radio/> must be used within a <RadioGroup/>");
  }
  return context;
}

const Radio = forwardRef(({ type, children, ...props }, ref) => {
  const { radioValue, handleRadioChange, name } = useRadio();

  return (
    <StyledContainer>
      <StyledRadio
        name={name}
        checked={props.value === radioValue}
        onChange={(e) => handleRadioChange({ value: props.value, e })}
        type="radio"
        {...props}
        ref={ref}
      />
      <StyledLabel>{children}</StyledLabel>
    </StyledContainer>
  );
});

const RadioGroup = forwardRef(
  (
    { children, label, value, onChange, error, onBlur, name, ...props },
    ref
  ) => {
    const [radioValue, setRadioValue] = useState(value);

    function handleRadioChange({ value, e }) {
      setRadioValue(value);
      onChange && onChange(e);
    }

    return (
      <RadioContext.Provider value={{ radioValue, handleRadioChange, name }}>
        <StyledFieldset {...props} ref={ref}>
          <StyledLegend error={error}>
            {label} {error && <img src={WarningIconUrl} alt="warning" />}
          </StyledLegend>
          {children}
        </StyledFieldset>
      </RadioContext.Provider>
    );
  }
);

export { RadioGroup, Radio };
