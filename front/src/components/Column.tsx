import React from 'react'
import Card from './Card'
import { motion } from 'framer-motion'

export default function Column({ name, items, onOpenReadme }: { name: string, items: any[], onOpenReadme?: (owner: string, repo: string)=>void }){
  return (
    <div className="p-3 rounded shadow-sm glass">
      <h3 className="font-semibold mb-2">{name} <span className="text-sm muted">({items.length})</span></h3>
      <div className="flex flex-col gap-2">
        {items.map((it)=> (
          <motion.div layout key={it.id}>
            <Card item={it} onOpenReadme={onOpenReadme} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
