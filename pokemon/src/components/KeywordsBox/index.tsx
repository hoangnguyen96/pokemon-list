import { memo } from "react";
import { Box, Chip, Paper, styled, Typography } from "@mui/material";
import { useSearch } from "../../contexts";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const KeywordsBox = () => {
  const { searchValues, removeSearchValue } = useSearch();

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
        {searchValues.map((label) => (
          <ListItem key={label}>
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
                  {label}
                </Typography>
              }
              onDelete={() => removeSearchValue(label)}
            />
          </ListItem>
        ))}
      </Paper>
    </Box>
  );
};

export default memo(KeywordsBox);
