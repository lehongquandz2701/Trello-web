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

const SelectAutoWidth = React.memo(
  ({ dataOption, onSelect, initValue }: TSelectAutoWidth) => {
    const [age, setAge] = React.useState(initValue);

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
      onSelect(event);
    };

    const menuItems = React.useMemo(() => {
      return dataOption.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              display: "flex",
              fontSize: "14px",
            }}
          >
            {item.icon} {item.title}
          </Box>
        </MenuItem>
      ));
    }, [dataOption]);

    return (
      <div>
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
          }}
          size="small"
        >
          <InputLabel id="demo-simple-select-autowidth-label">Mode</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            value={age}
            onChange={handleChange}
            autoWidth
            label="Mode"
          >
            {menuItems}
          </Select>
        </FormControl>
      </div>
    );
  }
);

export default SelectAutoWidth;
