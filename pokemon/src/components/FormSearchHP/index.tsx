import { memo } from "react";
import { Box, FormControl, OutlinedInput, Typography } from "@mui/material";

const FormSearchHP = () => {
  return (
    <Box>
      <Typography variant="h6" mb="12px">
        HP
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormControl sx={{ maxWidth: "90px" }}>
          <OutlinedInput placeholder="From" />
        </FormControl>
        <Typography>-</Typography>
        <FormControl sx={{ maxWidth: "90px" }}>
          <OutlinedInput placeholder="To" />
        </FormControl>
      </Box>
    </Box>
  );
};

export default memo(FormSearchHP);
