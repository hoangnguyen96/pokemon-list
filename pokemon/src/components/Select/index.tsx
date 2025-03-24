import { memo, useRef } from "react";
import { Box, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckList from "../CheckList";
import { IFilterState } from "../../stores";

interface SelectProps {
  title: string;
  keyFilter: keyof IFilterState;
  list: string[];
}

const Select = ({ title, keyFilter, list }: SelectProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    if (dropdownRef.current) {
      const isHidden = dropdownRef.current.style.display === "none";
      dropdownRef.current.style.display = isHidden ? "block" : "none";
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="8px"
        onClick={toggleDropdown}
      >
        <Typography variant="subtitle1">{title}</Typography>
        <Box className="arrow">
          <ArrowDropDownIcon />
        </Box>
      </Box>

      <Box ref={dropdownRef} style={{ display: "none" }}>
        <CheckList list={list} keyFilter={keyFilter} />
      </Box>
    </Box>
  );
};

export default memo(Select);
