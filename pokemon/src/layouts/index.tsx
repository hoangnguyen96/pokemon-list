import { Box } from "@mui/material";
import { Sidebar } from "../components";
import { ReactNode } from "react";
import { CardsProvider } from "../contexts";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box display="flex" gap="64px" width="100%" height="100%">
      <CardsProvider>
        <Sidebar />
        <Box flex="1">{children}</Box>
      </CardsProvider>
    </Box>
  );
};

export default MainLayout;
