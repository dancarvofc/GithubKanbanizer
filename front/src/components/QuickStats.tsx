import React from 'react'

export default function QuickStats({ stats }: { stats?: { stars?: number, forks?: number, watchers?: number, commitsYear?: number, topLanguage?: string, followers?: number } }){
  if (!stats) return null
  return (
    <div className="card p-3 flex gap-4 items-center">
      <div className="font-semibold">Quick Stats</div>
      <div className="muted">Stars: {stats.stars ?? 0}</div>
      <div className="muted">Forks: {stats.forks ?? 0}</div>
      <div className="muted">Watchers: {stats.watchers ?? 0}</div>
      {stats.commitsYear != null && <div className="muted">Commits/yr: {stats.commitsYear}</div>}
      {stats.topLanguage && <div className="pill bg-white/6 text-sm">{stats.topLanguage}</div>}
      {stats.followers != null && <div className="muted">Followers: {stats.followers}</div>}
    </div>
  )
}
