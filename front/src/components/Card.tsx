import React from 'react'
import { motion } from 'framer-motion'

export default function Card({ item }: { item: any }){
  return (
    <motion.a layout initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} whileHover={{scale:1.02}} className="block card glass" href={item.url} target="_blank" rel="noreferrer">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="font-medium">{item.name}</div>
          {item.description && <div className="text-sm muted">{item.description}</div>}
          <div className="mt-2 flex gap-2">
            {item.language && <span className="pill bg-white/6">{item.language}</span>}
            {item.is_fork && <span className="pill bg-white/6">fork</span>}
          </div>
        </div>
        <div className="text-sm muted">⭐ {item.stars}</div>
      </div>
    </motion.a>
  )
}
