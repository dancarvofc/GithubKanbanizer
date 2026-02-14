export function daysSince(dateStr?: string | null){
  if (!dateStr) return 9999
  const now = new Date()
  const d = new Date(dateStr)
  return Math.floor((now.getTime() - d.getTime()) / (1000*60*60*24))
}
