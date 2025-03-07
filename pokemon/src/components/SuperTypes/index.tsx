import { memo } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const SuperTypes = () => {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox sx={{ p: "6px" }} />}
        label="Pokémon"
      />
      <FormControlLabel
        control={<Checkbox sx={{ p: "6px" }} />}
        label="Trainer"
      />
      <FormControlLabel
        control={<Checkbox sx={{ p: "6px" }} />}
        label="Energy"
      />
    </FormGroup>
  );
};

export default memo(SuperTypes);
