import { use, useRef } from "react";
import { Box } from "@mui/material";

// Interfaces
import { ICard } from "../../interfaces";

// Components
import ListCard from "../ListCard";
import CardDetailModal, { ModalRef } from "../CardDetailModal";
import { CardDetailDispatchContext } from "../../contexts";

const CardListWithModal = () => {
  const modalRef = useRef<ModalRef["current"]>(null);
  const setCard = use(CardDetailDispatchContext);

  const handleClickItemCard = (card: ICard) => {
    modalRef.current?.openModal();
    setCard?.(card);
  };

  return (
    <>
      <Box mt="48px">
        <ListCard onClickItemCard={handleClickItemCard} />
      </Box>
      <CardDetailModal ref={modalRef} />
    </>
  );
};

export default CardListWithModal;
