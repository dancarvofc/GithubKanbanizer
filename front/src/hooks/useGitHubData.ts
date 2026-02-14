import { useQuery } from '@tanstack/react-query'

async function fetchKanban(username: string){
  const base = import.meta.env.VITE_API_URL || 'http://localhost:3001'
  const safe = encodeURIComponent(username.trim())
  const res = await fetch(`${base}/kanban/${safe}`)
  if (!res.ok) {
    const txt = await res.text().catch(()=>res.statusText)
    throw new Error(`Failed to fetch kanban: ${res.status} ${txt}`)
  }
  return res.json()
}

export function useKanban(username: string, options = { enabled: true }){
  const enabled = !!username && (options as any).enabled
  return useQuery(['kanban', username], () => fetchKanban(username), { enabled })
}
