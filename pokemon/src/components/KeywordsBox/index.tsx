import { Box, Chip, Paper, styled, Typography } from "@mui/material";

// Hooks
import { useSearch } from "../../hooks";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const KeywordsBox = () => {
  const { searchValues, dispatch } = useSearch();

  const handleDelete = (value: string) => {
    dispatch({ type: "REMOVE", value });
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
        {searchValues.map((value) => (
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
