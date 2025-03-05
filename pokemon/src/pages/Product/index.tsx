import { Box } from "@mui/material";

// Layouts
import MainLayout from "../../layouts";

// Components
import { ListCard, Searchbar } from "../../components";
import { useCallback, useState } from "react";
import useDebounce from "../../hooks";

const ProductPage = () => {
  const [valueSearch, setValueSearch] = useState("");

  const debouncedSearch = useDebounce(valueSearch, 500);

  const handleSearch = useCallback((value: string) => {
    setValueSearch(value);
  }, []);

  return (
    <MainLayout>
      <Searchbar onSearch={handleSearch} />
      <Box mt="48px">
        <ListCard name={debouncedSearch} />
      </Box>
    </MainLayout>
  );
};

export default ProductPage;
