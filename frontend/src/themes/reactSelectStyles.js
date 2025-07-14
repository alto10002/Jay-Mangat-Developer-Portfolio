export const getReactSelectStyles = (theme) => ({
  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: theme.palette.primary.main,
    width: "100%",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: theme.palette.primary.main,
    color: "black",
  }),
  option: (provided, { isFocused, isSelected }) => ({
    ...provided,
    backgroundColor: isSelected
      ? theme.palette.primary.main
      : isFocused
      ? theme.palette.action.hover
      : undefined,
    color: "black",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: theme.palette.action.selected,
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "black",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "black",
  }),
});
