import { lazy, LazyExoticComponent, Suspense } from 'react'

const modules = import.meta.glob<
  Promise<{ default: React.ComponentType<any> }>
>('../../components/dashboard/*.tsx')

// Cria um mapa com os nomes baseados no nome do arquivo (ex: "Home")
const componentMap: Record<
  string,
  () => Promise<{ default: React.ComponentType<any> }>
> = {}

for (const path in modules) {
  const match = path.match(/\.\.\/dashboard\/(.*)\.tsx$/)
  if (match) {
    const name = match[1]
    componentMap[name] = async () => await modules[path]()
  }
}

export default function DynamicComponentLoader({ path }: { path: string }) {
  const LazyComponent: LazyExoticComponent<React.ComponentType<any>> | null =
    componentMap[path] ? lazy(componentMap[path]) : null

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      {LazyComponent ? (
        <LazyComponent />
      ) : (
        <div>Componente não encontrado: {path}</div>
      )}
    </Suspense>
  )
}
