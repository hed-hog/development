import { useClickOutside } from '@/hooks/use-click-outside'
import { IconCaretDownFilled } from '@tabler/icons-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

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

  const findNodeById = (nodes: TreeNode[], id: string): TreeNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node
      if (node.children) {
        const result = findNodeById(node.children, id)
        if (result) return result
      }
    }
    return null
  }

  const removeNodeById = (nodes: TreeNode[], id: string): TreeNode[] => {
    return nodes
      .filter((node) => node.id !== id)
      .map((node) => ({
        ...node,
        children: node.children ? removeNodeById(node.children, id) : undefined,
      }))
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

  const renderTree = (nodes: TreeNode[]): JSX.Element[] => {
    return nodes.map((node) => {
      const isExpanded = expandedKeys.has(node.id)
      return (
        <div
          key={node.id}
          style={{
            paddingLeft: 20,
            cursor: 'pointer',
          }}
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
            onContextMenu={(e) => handleContextMenu(e, node)}
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
            {isExpanded && node.children && renderTree(node.children)}
          </motion.div>
        </div>
      )
    })
  }

  return (
    <div style={{ position: 'relative' }}>
      {renderTree(sampleData)}

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
    </div>
  )
}

export default Tree
