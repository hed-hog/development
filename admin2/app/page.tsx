import { AppShell } from "@/components/app-shell"

export default function Home() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Bem-vindo ao Dashboard</h1>
        <p className="text-gray-500">
          Este é um exemplo de conteúdo principal. O AppShell fornece uma navegação responsiva que pode ser expandida ou
          recolhida.
        </p>
        <p className="text-gray-500">
          Clique no item &quot;Settings&quot; no menu lateral para abrir o painel de submenu usando o componente Sheet.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-6 bg-white border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <h3 className="font-medium">Card {i + 1}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Conteúdo de exemplo para demonstrar o layout.
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
