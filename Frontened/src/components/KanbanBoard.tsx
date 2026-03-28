import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Deal } from '../store/useAppStore';
import { GripVertical, Clock, User } from 'lucide-react';

interface KanbanBoardProps {
  deals: Deal[];
  onMoveDeal: (id: string, status: Deal['status']) => void;
}

const columns: { id: Deal['status']; title: string; color: string }[] = [
  { id: 'lead', title: 'Lead', color: 'bg-gray-500' },
  { id: 'warm', title: 'Warm', color: 'bg-blue-500' },
  { id: 'negotiation', title: 'Negotiation', color: 'bg-yellow-500' },
  { id: 'closed', title: 'Closed', color: 'bg-green-500' },
];

interface KanbanCardProps {
  deal: Deal;
}

function KanbanCard({ deal }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    high: 'border-l-red-500',
    medium: 'border-l-yellow-500',
    low: 'border-l-green-500',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-slate-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-slate-600 border-l-4 ${priorityColors[deal.priority]} ${
        isDragging ? 'opacity-50 scale-105 shadow-lg' : ''
      } cursor-grab active:cursor-grabbing`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 dark:text-white text-sm">{deal.title}</h4>
        <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{deal.client}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
          ${deal.value.toLocaleString()}
        </span>
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="w-3 h-3" />
          {new Date(deal.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

function DragOverlayCard({ deal }: { deal: Deal }) {
  const priorityColors = {
    high: 'border-l-red-500',
    medium: 'border-l-yellow-500',
    low: 'border-l-green-500',
  };

  return (
    <div className={`bg-white dark:bg-slate-700 rounded-lg p-4 shadow-xl border-2 border-blue-500 border-l-4 ${priorityColors[deal.priority]} rotate-3 scale-105`}>
      <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">{deal.title}</h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{deal.client}</p>
      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
        ${deal.value.toLocaleString()}
      </span>
    </div>
  );
}

export default function KanbanBoard({ deals, onMoveDeal }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeDeal = deals.find((d) => d.id === active.id);
    if (!activeDeal) return;

    // Check if dropped on a column
    const targetColumn = columns.find((c) => c.id === over.id);
    if (targetColumn && activeDeal.status !== targetColumn.id) {
      onMoveDeal(activeDeal.id, targetColumn.id);
      return;
    }

    // Check if dropped on another card
    const overDeal = deals.find((d) => d.id === over.id);
    if (overDeal && activeDeal.status !== overDeal.status) {
      onMoveDeal(activeDeal.id, overDeal.status);
    }
  };

  const activeDeal = deals.find((d) => d.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => {
          const columnDeals = deals.filter((d) => d.status === column.id);
          const totalValue = columnDeals.reduce((sum, d) => sum + d.value, 0);

          return (
            <div
              key={column.id}
              className="flex-shrink-0 w-[300px] bg-gray-100 dark:bg-slate-800/50 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${column.color}`} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{column.title}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                    {columnDeals.length}
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Total: ${totalValue.toLocaleString()}
              </div>
              <SortableContext
                items={columnDeals.map((d) => d.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3 min-h-[200px]">
                  {columnDeals.map((deal) => (
                    <KanbanCard key={deal.id} deal={deal} />
                  ))}
                  {columnDeals.length === 0 && (
                    <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg">
                      <p className="text-sm text-gray-400 dark:text-gray-500">Drop deals here</p>
                    </div>
                  )}
                </div>
              </SortableContext>
            </div>
          );
        })}
      </div>
      <DragOverlay>
        {activeDeal ? <DragOverlayCard deal={activeDeal} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
