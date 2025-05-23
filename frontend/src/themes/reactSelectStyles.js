// theme/reactSelectStyles.js
export const getReactSelectStyles = (theme) => ({
  container: (provided) => ({
    ...provided,
    width: "100%", // ✅ make container take full width of Grid
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: theme.palette.primary.main,
    // borderColor: theme.palette.divider,
    // borderRadius: theme.shape.borderRadius,
    // padding: "2px 4px",
    width: "100%",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: theme.palette.background.main,
    color: theme.palette.text.primary,
  }),
  option: (provided, { isFocused, isSelected }) => ({
    ...provided,
    backgroundColor: isSelected ? theme.palette.primary.main : isFocused ? theme.palette.action.hover : undefined,
    color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: theme.palette.action.selected,
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: theme.palette.text.primary,
  }),
});
