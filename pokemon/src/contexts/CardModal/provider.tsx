import { createContext, ReactNode, useRef } from "react";
import { ICard } from "../../interfaces";
import CardDetailModal, { ModalRef } from "../../components/CardDetailModal";

interface CardDetailContextType {
  getSelectedCard: () => ICard | null;
  openCardDetail: (card: ICard) => void;
  closeCardDetail: () => void;
}

export const CardDetailContext = createContext<
  CardDetailContextType | undefined
>(undefined);

export const CardDetailProvider = ({ children }: { children: ReactNode }) => {
  const modalRef = useRef<ModalRef["current"]>(null);
  const selectedCardRef = useRef<ICard | null>(null);

  const openCardDetail = (card: ICard) => {
    selectedCardRef.current = card;
    modalRef.current?.openModal();
  };

  const closeCardDetail = () => {
    selectedCardRef.current = null;
    modalRef.current?.closeModal();
  };

  const getSelectedCard = () => selectedCardRef.current;

  return (
    <CardDetailContext
      value={{ getSelectedCard, openCardDetail, closeCardDetail }}
    >
      {children}
      <CardDetailModal ref={modalRef} />
    </CardDetailContext>
  );
};
