import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { GripVertical, Pencil, Trash2 } from 'lucide-react'
import { ACTIVITY_TYPES, SEMESTERS } from '../../utils/constants'
import Button from '../common/Button'

function getSemesterLabel(id) {
  return SEMESTERS.find((s) => s.id === id)?.title || `Semester ${id}`
}

export default function ContentList({ activities, onEdit, onDelete, onReorder }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(activities)
    const [reordered] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reordered)
    onReorder(items)
  }

  if (!activities.length) {
    return (
      <div className="p-12 text-center rounded-2xl border-2 border-dashed border-olive-200 dark:border-olive-700 text-olive-500">
        No content yet. Add your first activity above.
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="activities">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
            {activities.map((activity, index) => (
              <Draggable key={activity.id} draggableId={activity.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-olive-800 border border-cream-300/50 dark:border-olive-700 shadow-sm ${
                      snapshot.isDragging ? 'shadow-lg ring-2 ring-olive-400' : ''
                    }`}
                  >
                    <div
                      {...provided.dragHandleProps}
                      className="text-olive-400 cursor-grab active:cursor-grabbing"
                      aria-label="Drag to reorder"
                    >
                      <GripVertical size={20} />
                    </div>

                    {activity.images?.[0] && (
                      <img
                        src={activity.images[0]}
                        alt=""
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />
                    )}

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-olive-900 dark:text-cream-50 truncate">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-olive-500 dark:text-cream-400">
                        {getSemesterLabel(activity.semester)} ·{' '}
                        {activity.type === ACTIVITY_TYPES.CURRICULAR
                          ? 'Curricular'
                          : 'Co-Curricular'}
                      </p>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(activity)}>
                        <Pencil size={16} />
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => onDelete(activity)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
