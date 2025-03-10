import { Box } from "@mui/material";
import { Sidebar } from "../components";
import { ReactNode } from "react";
import { CardsProvider, SearchProvider } from "../contexts";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box display="flex" gap="64px" width="100%" height="100%">
      <SearchProvider>
        <CardsProvider>
          <Sidebar />
          <Box flex="1">{children}</Box>
        </CardsProvider>
      </SearchProvider>
    </Box>
  );
};

export default MainLayout;
