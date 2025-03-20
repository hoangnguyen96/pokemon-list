import { use, useCallback, useEffect, useRef } from "react";
import { Box, CircularProgress } from "@mui/material";

// Constants
import { PAGE_SIZE } from "../../constants";

// Services
import { getData } from "../../services";

// Hooks
import { useListCard } from "../../hooks";

// Utils
import { queryParamsFromCheckList, generateSearchQuery } from "../../utils";

// Contexts
import { CardsDispatchContext } from "../../contexts";

// Components
import ItemCard from "../ItemCard";

const ListCard = () => {
  const { cards, page, loading, hasMore, searchValues, checkList } =
    useListCard();
  const dispatch = use(CardsDispatchContext);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (loading || !hasMore || !containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      dispatch({ type: "SET_PAGE", payload: Number(page + 1) });
    }
  }, [loading, hasMore, dispatch]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `?${generateSearchQuery(
          searchValues
        )}${queryParamsFromCheckList(
          checkList
        )}page=${page}&pageSize=${PAGE_SIZE}`;

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

    fetchData();
  }, [page, searchValues, checkList]);

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

export default ListCard;
