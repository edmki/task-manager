import { useDroppable } from "@dnd-kit/react";
import { CollisionDetector } from "@dnd-kit/collision";
import { CollisionPriority, CollisionType } from "@dnd-kit/abstract";

const topDetector: CollisionDetector = ({ dragOperation, droppable }) => {
  if (!dragOperation.shape || !droppable.shape) {
    return null;
  }

  const draggableRect = dragOperation.shape.current.boundingRectangle;
  const droppableRect = droppable.shape.boundingRectangle;

  const topCenterX = draggableRect.left + draggableRect.width / 2;

  const topY = draggableRect.top;

  const isInside =
    topCenterX >= droppableRect.left &&
    topCenterX <= droppableRect.right &&
    topY >= droppableRect.top &&
    topY <= droppableRect.bottom;

  return isInside
    ? {
        id: droppable.id,
        value: 1, // Higher values win
        type: CollisionType.Collision,
        priority: CollisionPriority.Normal,
      }
    : null;
};

export function TimeInterval({
  id,
  children,
  className,
}: {
  id: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const { ref, isDropTarget } = useDroppable({
    id,
    collisionDetector: topDetector,
  });

  return (
    <div
      ref={ref}
      className={`${className} ${isDropTarget ? "bg-zinc-700" : ""}`}
    >
      {children}
    </div>
  );
}
