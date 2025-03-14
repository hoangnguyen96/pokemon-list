import { createContext } from "react";
import { ModalRefObject } from "../interfaces";

export const ModalContext = createContext<ModalRefObject | null>(null);
