import { memo, useCallback, useEffect, useRef } from "react";
import { Box, CircularProgress, ImageListItem } from "@mui/material";

// Contexts
import { useListCard } from "../../contexts";

const ListCard = () => {
  const { cards, page, loading, hasMore, setPage, fetchData } = useListCard();

  const containerRef = useRef<HTMLDivElement | null>(null);

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
    <Box
      ref={containerRef}
      display="flex"
      flexDirection="column"
      width="100%"
      height="85vh"
      overflow="hidden scroll"
    >
      <Box display="flex" gap="24px" flexWrap="wrap">
        {cards.map((card) => (
          <ImageListItem key={card.id} sx={{ width: "262px", height: "347px" }}>
            <img src={card.images.small} alt={card.name} loading="lazy" />
          </ImageListItem>
        ))}
      </Box>

      {/* Loading Indicator */}
      {loading && (
        <CircularProgress sx={{ mt: "32px", mx: "auto", color: "white" }} />
      )}
    </Box>
  );
};

export default memo(ListCard);
