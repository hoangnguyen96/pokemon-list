import { Box } from "@mui/material";
import { Sidebar } from "../components";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box display="flex" gap="64px" height="100%">
      <Sidebar />
      <Box flex="1">{children}</Box>
    </Box>
  );
};

export default MainLayout;
