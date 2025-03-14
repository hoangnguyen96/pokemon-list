import { RefObject } from "react";

export type ModalRef = {
  openModal: () => void;
  closeModal: () => void;
};

export type ModalRefObject = RefObject<ModalRef | null>;
