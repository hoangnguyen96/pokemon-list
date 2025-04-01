import { Box } from "@mui/material";

// Constants
import { LIST_SUBTYPE, LIST_SUPERTYPE, LIST_TYPE } from "../../constants/types";

// Components
import Select from "../Select";
import KeywordsBox from "../KeywordsBox";
import FormSearchHP from "../FormSearchHP";
import CheckList from "../CheckList";

const Sidebar = () => (
  <Box
    display="flex"
    flexDirection="column"
    gap="24px"
    flex="1"
    maxWidth="240px"
    bgcolor="white"
    borderRadius="8px"
    p="16px"
    height="fit-content"
  >
    <KeywordsBox />
    <CheckList list={LIST_SUPERTYPE} keyFilter="supertype" />
    <Select title="Type" list={LIST_TYPE} keyFilter="types" />
    <Select title="Subtype" list={LIST_SUBTYPE} keyFilter="subtypes" />
    <FormSearchHP />
  </Box>
);

export default Sidebar;
