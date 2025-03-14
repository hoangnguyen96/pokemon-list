import { Box } from "@mui/material";

// Context
import { CardDetailProvider, ModalContext } from "../../contexts";

// Layouts
import MainLayout from "../../layouts";

// Components
import { CardDetailModalContent, ListCard, Searchbar } from "../../components";
import { useRef } from "react";
import BaseModal from "../../components/BaseModal";

const ProductPage = () => {
  const modalRef = useRef(null);

  return (
    <Box display="flex" gap="64px" height="100%">
      <MainLayout>
        <Searchbar />
        <CardDetailProvider>
          <Box mt="48px">
            <ModalContext value={modalRef}>
              <ListCard />
            </ModalContext>
          </Box>
          <BaseModal ref={modalRef}>
            <CardDetailModalContent />
          </BaseModal>
        </CardDetailProvider>
      </MainLayout>
    </Box>
  );
};

export default ProductPage;
