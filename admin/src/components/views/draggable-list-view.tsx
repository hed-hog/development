import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { GripVertical } from 'lucide-react'
import React, { useState } from 'react'
import SortableItem from '@/components/custom/sortable-item'

// Definição das interfaces
interface DraggableListItem {
  id: string
  label: string
}

interface DraggableListViewProps {
  data: Array<DraggableListItem>
}

const DraggableListView: React.FC<DraggableListViewProps> = ({ data }) => {
  const [items, setItems] = useState<DraggableListItem[]>(data)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === active.id)
        const newIndex = prevItems.findIndex((item) => item.id === over?.id)
        const newItems = arrayMove(prevItems, oldIndex, newIndex)

        // Salve o state atualizado, por exemplo, enviando para uma API
        // saveStateToAPI(newItems);

        return newItems
      })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id}>
            <div className='flex flex-row rounded-md border border-gray-200 px-2 py-4'>
              <GripVertical className='mr-2 w-4' />
              <span>{item.label}</span>
            </div>
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  )
}

export default DraggableListView
