import { useDroppable } from "@dnd-kit/react";
import { CollisionDetector } from "@dnd-kit/collision";
import { CollisionPriority, CollisionType } from "@dnd-kit/abstract";

const topProximityDetector: CollisionDetector = ({
  dragOperation,
  droppable,
}) => {
  const draggableRect = dragOperation.shape?.current.boundingRectangle;
  const droppableRect = droppable.shape?.boundingRectangle;

  if (!draggableRect || !droppableRect) {
    return null;
  }

  const MAX_DISTANCE = 30;

  if (
    droppableRect.right < draggableRect.left ||
    droppableRect.left > draggableRect.right
  ) {
    return null;
  }

  const distance = Math.abs(draggableRect.top - droppableRect.top);

  if (distance > MAX_DISTANCE) {
    return null;
  }

  return {
    id: droppable.id,
    value: 1 / (distance + 1),
    type: CollisionType.Collision,
    priority: CollisionPriority.Normal,
  };
};

export function TimeInterval({
  id,
  children,
  className,
  style,
}: {
  id: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, isDropTarget } = useDroppable({
    id,
    collisionDetector: topProximityDetector,
  });

  return (
    <div
      ref={ref}
      className={`${className} ${isDropTarget ? "bg-zinc-700" : ""}`}
      style={style}
    >
      {children}
    </div>
  );
}
