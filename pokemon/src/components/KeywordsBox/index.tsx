import { use } from "react";
import { Box, Chip, Paper, styled, Typography } from "@mui/material";

// Context
import { CardsDispatchContext, SearchContext } from "../../contexts";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const KeywordsBox = () => {
  const searchValues = use(SearchContext);
  const dispatch = use(CardsDispatchContext);

  const handleDelete = (value: string) => {
    dispatch({ type: "REMOVE_SEARCH", value });
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
        {searchValues?.map((value) => (
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
