import { Box, ImageListItem } from "@mui/material";

// Layouts
import MainLayout from "../../layouts";

// Components
import { Searchbar } from "../../components";

// Image
import temporaryImg from "../../assets/temporary.png";

const ProductPage = () => {
  return (
    <MainLayout>
      <Searchbar />
      <Box mt="48px">
        <Box
          display="flex"
          gap="24px"
          width="100%"
          height="85vh"
          flexWrap="wrap"
          overflow="hidden scroll"
        >
          {Array.from({ length: 20 }, (_, index) => (
            <ImageListItem key={index} sx={{ width: "262px", height: "347px" }}>
              <img
                srcSet={`${temporaryImg}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${temporaryImg}?w=164&h=164&fit=crop&auto=format`}
                alt="Temporary Image"
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </Box>
      </Box>
    </MainLayout>
  );
};

export default ProductPage;
