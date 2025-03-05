import { useCallback, useEffect, useRef, useState } from "react";
import { Box, CircularProgress, ImageListItem } from "@mui/material";

// Constants
import { PAGE_SIZE } from "../../constants";

// Services
import { getList } from "../../services";

interface Card {
  id: string;
  images: { small: string };
  name: string;
}

const ListCard = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      // Increment page when reaching end of list
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const newCards = await getList(page, PAGE_SIZE);

        if (newCards.length < PAGE_SIZE) setHasMore(false);

        setCards((prev) => {
          const uniqueCards = new Map(
            [...prev, ...newCards].map((c) => [c.id, c])
          );
          return Array.from(uniqueCards.values());
        });
      } catch (error) {
        console.error("Error fetching Pokémon cards:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="85vh"
      overflow="hidden scroll"
    >
      <Box display="flex" gap="24px" flexWrap="wrap">
        {cards.map((card, index) => (
          <ImageListItem
            key={card.id}
            sx={{ width: "262px", height: "347px" }}
            ref={index === cards.length - 1 ? lastItemRef : null}
          >
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

export default ListCard;
