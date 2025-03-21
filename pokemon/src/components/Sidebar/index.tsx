import { memo } from "react";
import { Box } from "@mui/material";

// Constants
import { LIST_SUBTYPE, LIST_SUPERTYPE, LIST_TYPE } from "../../constants/types";

// Stores
import { KEYS_FILTER } from "../../stores";

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
    <CheckList list={LIST_SUPERTYPE} keyFilter={KEYS_FILTER.SUPER_TYPE} />
    <Select title="Type" list={LIST_TYPE} keyFilter={KEYS_FILTER.TYPES} />
    <Select
      title="Subtype"
      list={LIST_SUBTYPE}
      keyFilter={KEYS_FILTER.SUB_TYPES}
    />
    <FormSearchHP />
  </Box>
);

export default memo(Sidebar);
