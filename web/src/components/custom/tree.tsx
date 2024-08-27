import { useClickOutside } from '@/hooks/use-click-outside'
import { IconCaretDownFilled } from '@tabler/icons-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'

interface TreeNode {
  id: string
  title: string
  children?: TreeNode[]
}

interface TreeProps {
  data: TreeNode[]
}

const Tree: React.FC<TreeProps> = ({ data }) => {
  const [sampleData, setSampleData] = useState(data)
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set())
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
  const [contextMenu, setContextMenu] = useState<{
    x: number
    y: number
  } | null>(null)

  const contextMenuRef = useClickOutside(() => setContextMenu(null))

  const toggleExpand = (id: string) => {
    setExpandedKeys((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const findNodeById = (
    nodes: TreeNode[],
    id: string
  ): { node: TreeNode | null; parent: TreeNode | null } => {
    for (const node of nodes) {
      if (node.id === id) return { node, parent: null }
      if (node.children) {
        const result = findNodeById(node.children, id)
        if (result.node) return { node: result.node, parent: node }
      }
    }
    return { node: null, parent: null }
  }

  const removeNodeById = (nodes: TreeNode[], id: string): TreeNode[] => {
    return nodes
      .filter((node) => node.id !== id)
      .map((node) => ({
        ...node,
        children: node.children ? removeNodeById(node.children, id) : undefined,
      }))
  }

  const moveNode = (
    nodes: TreeNode[],
    sourceId: string,
    destinationId: string
  ): TreeNode[] => {
    const { node: sourceNode } = findNodeById(nodes, sourceId)
    const { node: destinationNode } = findNodeById(nodes, destinationId)

    if (!sourceNode) return nodes

    const removeSourceNode = (nodes: TreeNode[]): TreeNode[] => {
      return nodes
        .filter((node) => node.id !== sourceId)
        .map((node) => ({
          ...node,
          children: node.children ? removeSourceNode(node.children) : undefined,
        }))
    }

    const addNodeToParent = (
      nodes: TreeNode[],
      parentId: string
    ): TreeNode[] => {
      return nodes.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...(node.children || []), sourceNode],
          }
        }
        return {
          ...node,
          children: node.children
            ? addNodeToParent(node.children, parentId)
            : undefined,
        }
      })
    }

    if (!destinationNode) {
      return removeSourceNode(nodes)
    }

    const updatedNodes = removeSourceNode(nodes)
    return addNodeToParent(updatedNodes, destinationId)
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const sourceId = result.draggableId
    const destinationId = result.destination.droppableId

    const updatedData = moveNode(sampleData, sourceId, destinationId)
    setSampleData(updatedData)
  }

  const handleContextMenu = (e: React.MouseEvent, node: TreeNode) => {
    e.preventDefault()
    setSelectedNode(node)
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  const handleMenuAction = (action: 'add' | 'remove') => {
    switch (action) {
      case 'add':
        const newNodeTitle = prompt('Enter title for new node:')
        if (newNodeTitle !== null && selectedNode) {
          setSampleData((data) => {
            const addNode = (nodes: TreeNode[]): TreeNode[] => {
              return nodes.map((node) => {
                if (node.id === selectedNode.id) {
                  const newNode: TreeNode = {
                    id: Date.now().toString(),
                    title: newNodeTitle,
                  }
                  return {
                    ...node,
                    children: [...(node.children || []), newNode],
                  }
                }
                return {
                  ...node,
                  children: node.children ? addNode(node.children) : undefined,
                }
              })
            }
            return addNode(data)
          })
        }
        break
      case 'remove':
        if (selectedNode) {
          setSampleData((data) => removeNodeById(data, selectedNode.id))
        }
        break
    }
    setContextMenu(null)
  }

  const renderTree = (nodes: TreeNode[], level = 0): JSX.Element[] => {
    return nodes.map((node, index) => {
      const isExpanded = expandedKeys.has(node.id)
      return (
        <Draggable key={node.id} draggableId={node.id} index={index}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              style={{
                paddingLeft: 20 * (level + 1),
                cursor: 'pointer',
                ...provided.draggableProps.style,
              }}
              onContextMenu={(e) => handleContextMenu(e, node)}
            >
              {node.children && Boolean(node.children.length) && (
                <motion.div
                  initial={false}
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className='absolute'
                >
                  <IconCaretDownFilled className='w-4' />
                </motion.div>
              )}
              <div
                className='relative'
                onClick={() => toggleExpand(node.id)}
                style={{
                  paddingLeft: 20,
                  cursor: 'pointer',
                }}
              >
                {node.title}
              </div>
              <motion.div
                initial={false}
                animate={{
                  height: isExpanded ? 'auto' : 0,
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                {isExpanded && node.children && (
                  <Droppable droppableId={node.id} type='SUB_TREE'>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {renderTree(node.children as TreeNode[], level + 1)}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
              </motion.div>
            </div>
          )}
        </Draggable>
      )
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='tree-root' type='TREE'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {renderTree(sampleData)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {contextMenu !== null && (
        <div
          ref={contextMenuRef}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            top: `${contextMenu.y - 900}px`,
            left: `${contextMenu.x}px`,
            border: '1px solid #ddd',
            borderRadius: 4,
            zIndex: 1000,
            backgroundColor: '#020817',
          }}
        >
          <div onClick={() => handleMenuAction('add')}>Add</div>
          <div onClick={() => handleMenuAction('remove')}>Remove</div>
        </div>
      )}
    </DragDropContext>
  )
}

export default Tree
