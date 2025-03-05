import { Box } from "@mui/material";

// Layouts
import MainLayout from "../../layouts";

// Components
import { ListCard, Searchbar } from "../../components";

const ProductPage = () => {
  return (
    <MainLayout>
      <Searchbar />
      <Box mt="48px">
        <ListCard />
      </Box>
    </MainLayout>
  );
};

export default ProductPage;
