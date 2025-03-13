import { useState, useEffect } from 'react'

export default function DynamicComponentLoader({ path }: { path: string }) {
  const [Component, setComponent] = useState<React.FC | null>(null)

  useEffect(() => {
    if (path) {
      import(path.replace('@', '../..'))
        .then((mod) => {
          if (mod.default) {
            setComponent(() => mod.default)
          } else {
            console.error(`O módulo ${path} não exporta um componente válido.`)
          }
        })
        .catch((err) => console.error('Erro ao carregar o componente:', err))
    }
  }, [path])

  if (!Component) return <p>Carregando...</p>

  return <Component />
}
