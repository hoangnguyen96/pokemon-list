import { RefObject, useImperativeHandle, useState } from "react";
import { Box, Chip, Modal, Typography } from "@mui/material";

// Hooks
import { useCardDetail } from "../../hooks";

// Icons
import temporary from "../../assets/temporary.png";
import { StarIcon } from "../../themes/icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export type ModalRef = RefObject<{
  openModal: () => void;
  closeModal: () => void;
} | null>;

const CardDetailModal = ({ ref }: { ref: ModalRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { getSelectedCard } = useCardDetail();
  const selectedCard = getSelectedCard();

  useImperativeHandle(
    ref,
    () => ({
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false),
    }),
    []
  );

  const { name, images, hp, abilities, attacks, types } = selectedCard || {};

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
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
        <Box
          sx={{
            width: "100%",
            maxWidth: "504px",
            height: "auto",
            maxHeight: "554px",
          }}
        >
          <img
            src={images?.large || temporary}
            alt="Image temporary"
            loading="lazy"
            style={{ width: "80%", height: "554px", objectFit: "cover" }}
          />
        </Box>
        <Box display="flex" flexDirection="column" gap="24px" flex={1}>
          <Box display="flex" flexDirection="column" gap="16px">
            <Typography variant="h1" fontSize="24px" fontWeight="bold">
              {name || ""}
            </Typography>
            <Box display="flex" gap="8px">
              {types ? (
                types.map((item) => (
                  <Chip key={item} label={item} sx={{ bgcolor: "#CFF7D3" }} />
                ))
              ) : (
                <Box />
              )}
            </Box>
            <Typography variant="h2" fontSize="48px" fontWeight="bold">
              HP: {hp}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap="8px"
            p="16px"
            border="1px solid #ccc"
            borderRadius="8px"
          >
            <Chip
              label="Abilities"
              sx={{ bgcolor: "#EC221F", color: "white", width: "min-content" }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="caption" fontSize="16px" color="#007AFF">
                Lorem
              </Typography>
              <Box className="arrow">
                <ArrowDropDownIcon />
              </Box>
            </Box>
            <Typography variant="body1" fontSize="16px">
              {abilities?.[0]?.text || ""}
            </Typography>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="caption" fontSize="16px" color="#007AFF">
                Lorem
              </Typography>
              <Box className="arrow">
                <ArrowDropDownIcon />
              </Box>
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            gap="8px"
            p="16px"
            border="1px solid #ccc"
            borderRadius="8px"
          >
            <Chip
              label="Attacks"
              sx={{ bgcolor: "#EC221F", color: "white", width: "min-content" }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center">
                {Array.from({ length: 2 }).map((_, index) => (
                  <StarIcon key={index} />
                ))}
                <Typography variant="caption" fontSize="16px">
                  Lorem
                </Typography>
              </Box>
              <Typography variant="caption" fontSize="16px">
                {attacks?.[0]?.damage || 0}
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center">
                {Array.from({ length: 4 }).map((_, index) => (
                  <StarIcon key={index} />
                ))}
                <Typography variant="caption" fontSize="16px">
                  Lorem
                </Typography>
              </Box>
              <Typography variant="caption" fontSize="16px">
                {attacks?.[1]?.damage || 0}
              </Typography>
            </Box>

            <Typography variant="body1" fontSize="16px">
              {attacks?.[0]?.text || ""}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CardDetailModal;
