import { useQuery } from '@tanstack/react-query'

async function fetchStarred(username: string){
  const safe = encodeURIComponent(username.trim())
  const res = await fetch(`https://api.github.com/users/${safe}/starred`)
  if (!res.ok) throw new Error('Failed to fetch starred')
  const data = await res.json()

  // Map to the same columns shape used by backend
  const now = new Date()
  function daysSince(dateStr: string | null){
    if (!dateStr) return 9999
    const d = new Date(dateStr)
    return Math.floor((now.getTime() - d.getTime()) / (1000*60*60*24))
  }

  const cols = { active_labs: [] as any[], production_ready: [] as any[], legacy_library: [] as any[] }

  data.forEach((repo: any)=>{
    const diff = daysSince(repo.pushed_at || repo.updated_at)
    const card = {
      id: repo.id,
      name: repo.name,
      description: repo.description || null,
      stars: repo.stargazers_count,
      url: repo.html_url,
      language: repo.language || null,
      is_fork: repo.fork
    }

    const isRecentlyUpdated = diff <= 30
    const isPolished = repo.stargazers_count > 0 && !repo.fork

    if (isPolished && !isRecentlyUpdated) cols.production_ready.push(card)
    else if (isRecentlyUpdated && !repo.archived) cols.active_labs.push(card)
    else cols.legacy_library.push(card)
  })

  return { columns: cols }
}

export function useStarred(username: string, options = { enabled: true }){
  return useQuery(['starred', username], () => fetchStarred(username), { enabled: !!username && (options as any).enabled })
}
