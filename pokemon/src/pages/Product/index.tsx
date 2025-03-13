import { Box } from "@mui/material";

// Context
import { CardDetailProvider } from "../../contexts";

// Layouts
import MainLayout from "../../layouts";

// Components
import { CardListWithModal, Searchbar } from "../../components";

const ProductPage = () => {
  return (
    <Box display="flex" gap="64px" height="100%">
      <MainLayout>
        <Searchbar />
        <CardDetailProvider>
          <CardListWithModal />
        </CardDetailProvider>
      </MainLayout>
    </Box>
  );
};

export default ProductPage;
