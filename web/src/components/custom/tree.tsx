import { useClickOutside } from '@/hooks/use-click-outside'
import { IconChevronDown } from '@tabler/icons-react'
import { useState } from 'react'

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

  const handleMenuAction = (action: 'edit' | 'add' | 'remove') => {
    switch (action) {
      case 'edit':
        console.log('edit')
        const newTitle = prompt('Enter new title:', selectedNode?.title)
        if (newTitle !== null) {
          setSampleData((data) =>
            data.map((item) =>
              item.id === selectedNode?.id
                ? { ...item, title: newTitle }
                : {
                    ...item,
                    children: item.children
                      ? removeNodeById(item.children, String(selectedNode?.id))
                      : undefined,
                  }
            )
          )
        }
        break
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
    return nodes.map((node) => (
      <div
        key={node.id}
        style={{
          paddingLeft: 20,
          cursor: 'pointer',
        }}
      >
        {node.children && <IconChevronDown className='absolute' />}
        <div
          className='relative'
          onClick={() => toggleExpand(node.id)}
          onContextMenu={(e) => handleContextMenu(e, node)}
          style={{
            paddingLeft: 30,
            cursor: 'pointer',
          }}
        >
          {node.title}
        </div>
        {expandedKeys.has(node.id) &&
          node.children &&
          renderTree(node.children)}
      </div>
    ))
  }

  return (
    <div style={{ position: 'relative' }}>
      {renderTree(sampleData)}

      {contextMenu !== null && (
        <div
          style={{
            position: 'absolute',
            top: `${contextMenu.y - 920}px`,
            left: `${contextMenu.x}px`,
            border: '1px solid #ddd',
            borderRadius: 4,
            zIndex: 1000,
            backgroundColor: '#020817',
          }}
        >
          <div onClick={() => handleMenuAction('edit')}>Edit</div>
          <div onClick={() => handleMenuAction('add')}>Add</div>
          <div onClick={() => handleMenuAction('remove')}>Remove</div>
        </div>
      )}
    </div>
  )
}

export default Tree
