import { memo, useCallback, useEffect, useRef } from "react";
import { Box, CircularProgress } from "@mui/material";

// Contexts
import { useListCard } from "../../contexts";

// Components
import CardDetailModal, { CardDetailModalProps } from "../CardDetailModal";

const ListCard = () => {
  const { cards, page, loading, hasMore, setPage, fetchData } = useListCard();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<CardDetailModalProps["ref"]>({
    openModal: () => {},
    closeModal: () => {},
  });

  const handleScroll = useCallback(() => {
    if (loading || !hasMore || !containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setPage((prev: number) => prev + 1);
    }
  }, [loading, hasMore, setPage]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Reset page and cards when search term changes
  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <Box
        ref={containerRef}
        display="flex"
        flexDirection="column"
        width="100%"
        height="85vh"
        overflow="hidden scroll"
      >
        <Box display="flex" gap="24px" flexWrap="wrap" padding="12px">
          {cards.map((card) => (
            <Box
              key={card.id}
              sx={{
                width: "262px",
                height: "347px",
                cursor: "pointer",
              }}
              onClick={() => modalRef.current?.openModal(card.id)}
            >
              <img
                src={card.images.small}
                alt={card.name}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </Box>
          ))}
        </Box>

        {/* Loading Indicator */}
        {loading && (
          <CircularProgress sx={{ mt: "32px", mx: "auto", color: "white" }} />
        )}
      </Box>
      <CardDetailModal ref={modalRef.current} />
    </>
  );
};

export default memo(ListCard);
