import { forwardRef, useImperativeHandle, useState } from "react";
import { Box, Chip, Modal, Typography } from "@mui/material";

import temporary from "../../assets/temporary.png";
import { StarIcon } from "../../themes/icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Details = forwardRef((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false),
    }),
    []
  );

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box
        sx={{
          display: "flex",
          gap: "64px",
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
            src={temporary}
            alt="Image temporary"
            loading="lazy"
            style={{ width: "100%", height: "554px", objectFit: "cover" }}
          />
        </Box>
        <Box display="flex" flexDirection="column" gap="24px" flex={1}>
          <Box display="flex" flexDirection="column" gap="16px">
            <Typography variant="h1" fontSize="24px" fontWeight="bold">
              Venusaur-EX
            </Typography>
            <Box display="flex" gap="8px">
              <Chip label="Grass" sx={{ bgcolor: "#CFF7D3" }} />
              <Chip label="Basic" sx={{ bgcolor: "#CFF7D3" }} />
              <Chip label="EX" sx={{ bgcolor: "#CFF7D3" }} />
            </Box>
            <Typography variant="h2" fontSize="48px" fontWeight="bold">
              HP: 180
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
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here'
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
                60
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
                100
              </Typography>
            </Box>

            <Typography variant="body1" fontSize="16px">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
});

export default Details;
