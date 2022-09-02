import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useOutsideClick from "../../hooks/use-outside-click";
import {
  StyledContainer,
  StyledSelect,
  StyledSelectItem,
  StyledSelectPopover,
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

const SelectItem = forwardRef(({ label, value }, ref) => {
  const { handleSelectChange, handleCloseSelect } = useSelect();

  return (
    <StyledSelectItem
      ref={ref}
      onClick={() => {
        handleSelectChange({ value, label });
        handleCloseSelect();
      }}
    >
      {label}
    </StyledSelectItem>
  );
});

const Select = forwardRef(
  (
    {
      children,
      value,
      onChange,
      placeholder,
      error,
      name,
      defaultLabel,
      disabled,
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = useState(value);
    const [selectedLabel, setSelectedLabel] = useState(
      defaultLabel ?? placeholder ?? ""
    );
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const popoverRef = useRef();
    useOutsideClick(popoverRef, handleCloseSelect);

    function handleSelectChange({ value, label }) {
      setSelectedValue(value);
      setSelectedLabel(label);
      onChange && onChange({ name, value });
    }

    function handleCloseSelect() {
      setIsSelectOpen(false);
    }

    function handleToggleSelect() {
      setIsSelectOpen(!isSelectOpen);
    }
    useEffect(() => {
      setSelectedValue(value);
      setSelectedLabel(defaultLabel ?? placeholder ?? "");
    }, [defaultLabel, placeholder, value]);

    return (
      <SelectContext.Provider
        value={{
          handleSelectChange,
          handleCloseSelect,
        }}
      >
        <StyledContainer ref={popoverRef} disabled={disabled}>
          <StyledSelect
            onClick={handleToggleSelect}
            error={error}
            ref={ref}
            disabled={disabled}
          >
            {selectedLabel}
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
