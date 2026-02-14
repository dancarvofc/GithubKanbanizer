import React from 'react'
import { motion } from 'framer-motion'

export default function Card({ item, onOpenReadme }: { item: any, onOpenReadme?: (owner: string, repo: string)=>void }){
  const openReadme = () => {
    if (!onOpenReadme) return
    // Prefer explicit owner if present
    const owner = item.owner && (item.owner.login || item.owner)
    if (owner && item.name) return onOpenReadme(owner, item.name)

    // Fallback: parse owner and repo from html_url (https://github.com/owner/repo)
    try {
      const url = new URL(item.url)
      const parts = url.pathname.split('/').filter(Boolean)
      if (parts.length >= 2) {
        const [ownerFromUrl, repoFromUrl] = parts
        return onOpenReadme(ownerFromUrl, repoFromUrl)
      }
    } catch(e) {
      // ignore
    }
  }

  return (
    <motion.div layout initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} whileHover={{scale:1.02}} className="block card glass">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="font-medium">{item.name}</div>
          {item.description && <div className="text-sm muted">{item.description}</div>}
          <div className="mt-2 flex gap-2">
            {item.language && <span className="pill bg-white/6">{item.language}</span>}
            {item.is_fork && <span className="pill bg-white/6">fork</span>}
          </div>
        </div>
          <div className="flex flex-col items-end gap-2">
          <div className="text-sm muted">Stars: {item.stars}</div>
          <div className="flex gap-2 mt-2">
            <button className="glass px-2 py-1 text-sm" onClick={openReadme}>README</button>
            <a href={item.url} target="_blank" rel="noreferrer" className="glass px-2 py-1 text-sm">Open</a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
