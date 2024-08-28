import React, { useEffect, useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import SortableItem from './sortable-item'
import { Card, CardContent } from '@/components/ui/card'
import { GripVertical } from 'lucide-react'

// Definição das interfaces
interface ListItem {
  id: string
  label: string
}

interface ListViewProps {
  data: Array<ListItem>
}

const ListView: React.FC<ListViewProps> = ({ data }) => {
  const [items, setItems] = useState<ListItem[]>(data)

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

  useEffect(() => {
    console.log({ items })
  }, [items])

  return (
    <Card className='w-full'>
      <CardContent>
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
      </CardContent>
    </Card>
  )
}

export default ListView
