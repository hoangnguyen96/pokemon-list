import React, { memo } from "react";
import { Box, Chip, Paper, styled, Typography } from "@mui/material";
import { useSearch } from "../../contexts";

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const KeywordsBox = () => {
  const { searchValue } = useSearch();
  console.log("Search value:", searchValue);

  const [chipData, setChipData] = React.useState<readonly ChipData[]>([
    { key: 0, label: "Spring" },
    { key: 1, label: "Smart" },
    { key: 2, label: "Modern" },
    { key: 3, label: "Smart" },
    { key: 4, label: "Modern" },
  ]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
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
        }}
        component="ul"
      >
        {chipData.map((data) => {
          let icon;

          return (
            <ListItem key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                onDelete={handleDelete(data)}
              />
            </ListItem>
          );
        })}
      </Paper>
    </Box>
  );
};

export default memo(KeywordsBox);
