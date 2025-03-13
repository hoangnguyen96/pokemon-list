import { createContext, ReactNode, useState } from "react";
import { ICard } from "../../interfaces";

export const CardDetailContext = createContext<ICard | null | undefined>(null);

export const CardDetailDispatchContext = createContext<
  ((card: ICard | null) => void) | undefined
>(undefined);

export const CardDetailProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value?: ICard | null;
}) => {
  const [card, setCard] = useState<ICard | null | undefined>(value);

  return (
    <CardDetailContext value={card}>
      <CardDetailDispatchContext value={setCard}>
        {children}
      </CardDetailDispatchContext>
    </CardDetailContext>
  );
};
