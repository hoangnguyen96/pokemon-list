import { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

interface ItemProps {
  label: string;
}

interface SelectProps {
  title: string;
  list: ItemProps[];
}

const Select = ({ title, list }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      {/* Select Box */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="8px"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Typography variant="subtitle1">{title}</Typography>
        <Box className="arrow">
          {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Box>
      </Box>

      {/* Dropdown List */}
      {isOpen && (
        <FormGroup>
          {list.map((item) => (
            <FormControlLabel
              control={<Checkbox sx={{ p: "6px" }} />}
              label={item.label}
            />
          ))}
        </FormGroup>
      )}
    </Box>
  );
};

export default Select;
