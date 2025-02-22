import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/material";
import { TSelectOption } from "../utilities/types";

type TSelectAutoWidth = {
  dataOption: TSelectOption[];
  onSelect: (event: SelectChangeEvent) => void;
  initValue: string;
};

export default function SelectAutoWidth({
  dataOption,
  onSelect,
  initValue,
}: TSelectAutoWidth) {
  const [age, setAge] = React.useState(initValue);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
    onSelect(event);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Mode</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
          label="Mode"
        >
          {dataOption.map((item) => (
            <MenuItem value={item.value}>
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                  display: "flex",
                }}
              >
                {item.icon} {item.title}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
