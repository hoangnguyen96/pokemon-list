import { Box } from "@mui/material";

// Layouts
import MainLayout from "../../layouts";

// Components
import { ListCard, Searchbar } from "../../components";

const ProductPage = () => {
  return (
    <Box display="flex" gap="64px" height="100%">
      <MainLayout>
        <Searchbar />
        <Box mt="48px">
          <ListCard />
        </Box>
      </MainLayout>
    </Box>
  );
};

export default ProductPage;
