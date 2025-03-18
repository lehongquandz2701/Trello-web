import { Box, IconButton, TextareaAutosize } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { TextareaAutosizeProps } from "@mui/material";

type TInputCustomProps = {
  value?: string | number | readonly string[] | undefined;
  isShowOption?: boolean;
  styleInput?: React.CSSProperties;
  placeholder?: string;
} & Omit<TextareaAutosizeProps, "style" | "placeholder" | "value">;

const InputCustom = ({
  value,
  isShowOption = false,
  styleInput,
  placeholder,
  ...restProps
}: TInputCustomProps) => {
  const [isFocus, setFocus] = useState(false);

  const styleInputBorder = useMemo(() => {
    return isFocus
      ? {
          border: "2px solid #00e5ff",
          borderRadius: 5,
        }
      : { border: "2px solid #FFFFFF00", borderRadius: 5 };
  }, [setFocus, isFocus]);

  const onFocusAndBlur = useCallback(() => {
    setFocus((prev) => !prev);
  }, [setFocus]);

  const hideScrollbarStyle = {
    "&::-webkit-scrollbar": {
      display: "none",
    },

    msOverflowStyle: "none",
    scrollbarWidth: "none",
  };

  return (
    <Box
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        position: "relative",
        marginBottom: "10px",
        minHeight: 40,
        overflow: "hidden",
      }}
    >
      <TextareaAutosize
        data-no-dnd="true"
        placeholder={placeholder}
        value={value}
        maxRows={10}
        onFocus={onFocusAndBlur}
        onBlur={onFocusAndBlur}
        style={{
          height: "34px",
          marginRight: "50px",
          width: "100%",
          overflow: "hidden",
          outline: "none",
          padding: "5px 10px 0px 10px",
          fontSize: "16px",
          fontWeight: "500",
          resize: "none",
          ...hideScrollbarStyle,
          ...styleInputBorder,
          ...styleInput,
        }}
        {...restProps}
      />
      {isShowOption && (
        <IconButton
          sx={{
            position: "absolute",
            top: 0,
            right: 5,
            ":hover": {
              bgcolor: "#393b3d",
              borderRadius: 2,
            },
          }}
          aria-label="add an alarm"
        >
          <MoreHorizIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default InputCustom;
//#22272b
