import { memo, useCallback, useEffect, useRef } from "react";
import { Box, CircularProgress } from "@mui/material";

// Constants
import { PAGE_SIZE } from "../../constants";

// Services
import { getData } from "../../services";

// Hooks
import { useListCard, useSearch, useSetPage } from "../../hooks";

// Utils
import { generateSearchQuery } from "../../utils";

// Components
import ItemCard from "../ItemCard";

const ListCard = () => {
  const { cards, page, loading, hasMore, dispatch } = useListCard();
  const { searchValues } = useSearch();
  const setPage = useSetPage();

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

  useEffect(() => {
    setPage(1);
  }, [searchValues]);

  // Fetch data
  const fetchData = async () => {
    dispatch({ type: "UPDATE_STATE", payload: { loading: true } });

    try {
      const url = `?${
        searchValues ? `${generateSearchQuery(searchValues)}&` : ""
      }page=${page}&pageSize=${PAGE_SIZE}`;
      const newCards = await getData(url);

      dispatch({
        type: "UPDATE_STATE",
        payload: {
          cards: page === 1 ? newCards : [...cards, ...newCards],
          hasMore: newCards.length >= PAGE_SIZE,
          loading: false,
        },
      });
    } catch (error) {
      console.error("Error fetching cards:", error);
    }

    dispatch({ type: "UPDATE_STATE", payload: { loading: false } });
  };

  useEffect(() => {
    fetchData();
  }, [page, searchValues]);

  return (
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
          <ItemCard key={card.id} card={card} />
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
