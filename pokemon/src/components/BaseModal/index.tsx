import { ReactNode, useImperativeHandle, useState } from "react";
import { Box, Modal } from "@mui/material";
import { ModalRefObject } from "../../interfaces";

interface BaseModalProps {
  children: ReactNode;
  ref: ModalRefObject;
}

const BaseModal = ({ ref, children }: BaseModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false),
    }),
    []
  );

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          display: "flex",
          gap: "12px",
          p: "64px",
          width: "100%",
          maxWidth: "1200px",
          bgcolor: "white",
          borderRadius: "12px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%);",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default BaseModal;
