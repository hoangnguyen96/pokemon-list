import { memo, ReactNode } from "react";
import { Box } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DraggableItemProps {
  id: string;
  children: ReactNode;
}

const DraggableItem = ({ id, children }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "262px",
    height: "347px",
    cursor: "grab",
  };

  return (
    <Box ref={setNodeRef} {...attributes} {...listeners} sx={style}>
      {children}
    </Box>
  );
};

export default memo(DraggableItem);
