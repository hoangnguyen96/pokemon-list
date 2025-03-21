import { use } from "react";
import { Box, Chip, Paper, styled, Typography } from "@mui/material";

// Context
import { CardsDispatchContext, FilterNameContext } from "../../contexts";
import { CARDS_ACTIONS, KEYS_FILTER } from "../../stores";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const KeywordsBox = () => {
  const listName = use(FilterNameContext);
  const dispatch = use(CardsDispatchContext);

  const handleDelete = (value: string) => {
    dispatch({
      type: CARDS_ACTIONS.REMOVE_FILTER_VALUE,
      filterKey: KEYS_FILTER.NAME,
      value,
    });
  };

  return (
    <Box>
      <Typography variant="h6">Keywords</Typography>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          listStyle: "none",
          p: 0.5,
          m: 0,
          minHeight: "48px",
          maxHeight: "500px",
          overflow: "auto",
        }}
        component="ul"
      >
        {listName?.map((value) => (
          <ListItem key={value}>
            <Chip
              label={
                <Typography
                  noWrap
                  sx={{
                    maxWidth: "120px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "block",
                  }}
                >
                  {value}
                </Typography>
              }
              onDelete={() => handleDelete(value)}
            />
          </ListItem>
        ))}
      </Paper>
    </Box>
  );
};

export default KeywordsBox;
