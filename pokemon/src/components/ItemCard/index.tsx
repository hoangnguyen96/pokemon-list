import { memo } from "react";
import { Box } from "@mui/material";

// Interfaces
import { ICard } from "../../interfaces";

interface ItemCardProps {
  card: ICard;
  onClick: () => void;
}

const ItemCard = ({ card, onClick }: ItemCardProps) => {
  const { images, name } = card || {};

  return (
    <Box
      sx={{
        width: "262px",
        height: "347px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <img
        src={images?.small}
        alt={name}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </Box>
  );
};

export default memo(ItemCard);
