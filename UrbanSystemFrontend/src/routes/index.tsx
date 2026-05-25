import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="bg-primary flex items-center justify-center">
      <h1>Sistemi Urban i Kosoves</h1>
    </div>
  )
}
