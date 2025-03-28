import { use, useCallback, useEffect, useRef } from "react";
import { Box, CircularProgress } from "@mui/material";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

// Constants
import { PAGE_SIZE } from "../../constants";

// Services
import { getData } from "../../services";

// Hooks
import { useListCard } from "../../hooks";

// Utils
import { queryParamsFilter, transformData } from "../../utils";

// Contexts
import { CardsDispatchContext } from "../../contexts";

// Stores
import { CARDS_ACTIONS } from "../../stores";

// Components
import { ICard } from "../../interfaces";
import ItemCard from "../ItemCard";
import DraggableItem from "../DraggableItem";

const ListCard = () => {
  const { cards, orderIds, page, loading, hasMore, filters, hpRange } =
    useListCard();
  const { name, subtypes, supertype, types } = filters;
  const dispatch = use(CardsDispatchContext);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleScroll = useCallback(() => {
    if (loading || !hasMore || !containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      dispatch({ type: CARDS_ACTIONS.SET_PAGE, payload: Number(page + 1) });
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
      const paramsObj = {
        q: queryParamsFilter(filters, hpRange),
        page: String(page),
        pageSize: String(PAGE_SIZE),
      };
      const searchParams = new URLSearchParams(paramsObj);

      try {
        const newCards = await getData(`?${searchParams}`);

        dispatch({
          type: CARDS_ACTIONS.UPDATE_STATE,
          payload: {
            cards:
              page === 1
                ? transformData(newCards)
                : { ...cards, ...transformData(newCards) },
            orderIds:
              page === 1
                ? newCards.map((item: ICard) => item.id)
                : [...orderIds, ...newCards.map((item: ICard) => item.id)],
            hasMore: newCards.length >= PAGE_SIZE,
            loading: false,
          },
        });
      } catch (error) {
        console.error("Error fetching cards:", error);
      }

      dispatch({
        type: CARDS_ACTIONS.UPDATE_STATE,
        payload: { loading: false },
      });
    };

    fetchData();
  }, [page, name, subtypes, supertype, types, hpRange]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = orderIds.findIndex((id) => id === active.id);
      const newIndex = orderIds.findIndex((id) => id === over?.id);

      const reorderedOrderIds = arrayMove(orderIds, oldIndex, newIndex);

      dispatch({
        type: CARDS_ACTIONS.UPDATE_STATE,
        payload: { orderIds: reorderedOrderIds },
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={orderIds} strategy={rectSortingStrategy}>
        <Box
          ref={containerRef}
          display="flex"
          flexDirection="column"
          width="100%"
          height="85vh"
          overflow="hidden scroll"
        >
          <Box display="flex" gap="24px" flexWrap="wrap" padding="12px">
            {orderIds.map((id) => (
              <DraggableItem key={id} id={id}>
                <ItemCard card={cards[id]} />
              </DraggableItem>
            ))}
          </Box>

          {/* Loading Indicator */}
          {loading && (
            <CircularProgress sx={{ mt: "32px", mx: "auto", color: "white" }} />
          )}
        </Box>
      </SortableContext>
    </DndContext>
  );
};

export default ListCard;
