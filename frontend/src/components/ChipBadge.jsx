import { Chip, Avatar } from "@mui/material";

const ChipBadge = ({ label, icon: Icon, bgColor = "#FF9900", textAndIconColor = "black", iconSize = 18 }) => {
  return (
    <Chip
      avatar={
        <Avatar sx={{ bgcolor: "transparent" }}>
          <Icon size={iconSize} color={textAndIconColor} />
        </Avatar>
      }
      label={label}
      sx={{
        backgroundColor: bgColor,
        color: textAndIconColor,
        borderColor: bgColor,
        "& .MuiChip-label": {
          color: textAndIconColor,
          fontWeight: "bold",
        },
      }}
    />
  );
};

export default ChipBadge;
