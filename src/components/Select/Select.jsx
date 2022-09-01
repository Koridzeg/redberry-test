import { createContext, forwardRef, useContext, useRef, useState } from "react";
import useOutsideClick from "../../hooks/use-outside-click";
import {
  StyledContainer,
  StyledSelect,
  StyledSelectItem,
  StyledSelectPopover
} from "./Select.styles";
import ArrowDownUrl from "../../assets/images/down_arrow.png";

const SelectContext = createContext();

function useSelect() {
  const context = useContext(SelectContext);
  if (context === undefined) {
    throw new Error("<SelectItem/> must be used within a <Select/>");
  }
  return context;
}

const SelectItem = forwardRef(({ children, value }, ref) => {
  const { handleSelectChange, handleCloseSelect } = useSelect();

  return (
    <StyledSelectItem
      ref={ref}
      onClick={() => {
        handleSelectChange(value);
        handleCloseSelect();
      }}
    >
      {children}
    </StyledSelectItem>
  );
});

const Select = forwardRef(
  ({ children, value, onChange, placeholder, error }, ref) => {
    const [selectValue, setSelectValue] = useState(value);
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const popoverRef = useRef();
    useOutsideClick(popoverRef, handleCloseSelect);

    function handleSelectChange(newValue) {
      setSelectValue(newValue);
      onChange && onChange(newValue);
    }

    function handleCloseSelect() {
      setIsSelectOpen(false);
    }

    function handleToggleSelect() {
      setIsSelectOpen(!isSelectOpen);
    }

    return (
      <SelectContext.Provider
        value={{ selectValue, handleSelectChange, handleCloseSelect }}
      >
        <StyledContainer ref={popoverRef}>
          <StyledSelect onClick={handleToggleSelect} error={error} ref={ref}>
            {selectValue ?? placeholder}
            <img src={ArrowDownUrl} alt="" />
          </StyledSelect>
          {isSelectOpen && (
            <StyledSelectPopover>{children}</StyledSelectPopover>
          )}
        </StyledContainer>
      </SelectContext.Provider>
    );
  }
);

export { Select, SelectItem };