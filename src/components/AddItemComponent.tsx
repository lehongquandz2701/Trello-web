import { Box, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InputCustom from "./InputCustom";
import CloseIcon from "@mui/icons-material/Close";

type TAddItemComponentProps = {
  isOpen: boolean;
  onToggle: () => void;
  value?: string;
  onchange?: React.Dispatch<React.SetStateAction<string>>;
  onClick: () => void;
  width?: string;
  placeholder?: string;
  title: string;
  titleButton: string;
};

const AddItemComponent = ({
  isOpen,
  onToggle,
  value,
  onchange,
  onClick,
  width = "272px",
  placeholder = "Enter list name",
  title,
  titleButton,
}: TAddItemComponentProps) => {
  return (
    <Box
      sx={{
        padding: "10px",
      }}
    >
      {isOpen ? (
        <Box
          sx={{
            width,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "black" : "#b9d3d0",
            color: (theme) =>
              theme.palette.mode === "dark" ? "white" : "black",
            padding: 1,
            borderRadius: 2,
          }}
        >
          <InputCustom
            onChange={(e) => {
              onchange?.(e.target.value);
            }}
            autoFocus
            styleInput={{
              margin: "0",
            }}
            placeholder={placeholder}
            value={value}
          />
          <Box
            data-no-dnd="true"
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button onClick={onClick} variant="contained">
              {titleButton}
            </Button>
            <IconButton onClick={onToggle} aria-label="add an alarm">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Button
          onClick={onToggle}
          startIcon={<AddIcon />}
          sx={{
            width,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "black" : "#b9d3d0",
            height: "44px",
            color: (theme) =>
              theme.palette.mode === "dark" ? "white" : "black",
            justifyContent: "flex-start",
            padding: 2,
          }}
        >
          {title}
        </Button>
      )}
    </Box>
  );
};

export default AddItemComponent;
