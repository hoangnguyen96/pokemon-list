import { memo, use, useState } from "react";
import { alpha, InputBase, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Context
import { SearchDispatchContext } from "../../contexts";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.9),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    flex: 1,
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = use(SearchDispatchContext);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value !== searchTerm) {
      setSearchTerm(value);
    }
  };

  const addSearchKeywords = () => {
    if (searchTerm.trim() !== "") {
      dispatch({ type: "ADD", value: searchTerm });
      setSearchTerm("");
    }
  };

  return (
    <Search sx={{ borderRadius: "50px" }}>
      <SearchIconWrapper>
        <SearchIcon sx={{ cursor: "pointer" }} onClick={addSearchKeywords} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={(e) => e.key === "Enter" && addSearchKeywords()}
      />
    </Search>
  );
};

export default memo(Searchbar);
