import { memo, use } from "react";
import { Box } from "@mui/material";

// Context
import { CardDetailDispatchContext, ModalContext } from "../../contexts";

// Interfaces
import { ICard } from "../../interfaces";

interface ItemCardProps {
  card: ICard;
}

const ItemCard = ({ card }: ItemCardProps) => {
  const { images, name } = card || {};
  const setCard = use(CardDetailDispatchContext);
  const modalRef = use(ModalContext);

  const handleClick = () => {
    setCard?.(card);
    modalRef?.current?.openModal();
  };

  return (
    <Box
      sx={{
        width: "262px",
        height: "347px",
        cursor: "pointer",
      }}
      onClick={handleClick}
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
