import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  OutlinedInput,
  Typography,
} from "@mui/material";

// Constants
import { LIST_SUBTYPE, LIST_TYPE } from "../../constants/type";

// Components
import Select from "../Select";
import KeywordsBox from "../KeywordsBox";

const Sidebar = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="24px"
      flex="1"
      maxWidth="240px"
      bgcolor="white"
      borderRadius="8px"
      p="16px"
      height="fit-content"
    >
      <KeywordsBox />

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

      <Select title="Type" list={LIST_TYPE} />
      <Select title="Subtype" list={LIST_SUBTYPE} />

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
    </Box>
  );
};

export default Sidebar;
