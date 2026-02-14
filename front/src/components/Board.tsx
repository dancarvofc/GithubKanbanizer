import React from 'react'
import Column from './Column'
import Card from './Card'
import { motion, AnimatePresence } from 'framer-motion'

export default function Board({ title, data, loading, onOpenReadme, showForks = true }: { title: string, data?: any, loading?: boolean, onOpenReadme?: (owner: string, repo: string)=>void, showForks?: boolean }){
  if (!data && !loading) return <div className="p-4 card rounded">No data. Faça uma busca pelo username.</div>

  // Remove forks from main columns and collect them into a separate array
  const active = (data?.active_labs || []).filter((it: any) => !it.is_fork)
  const production = (data?.production_ready || []).filter((it: any) => !it.is_fork)
  const legacy = (data?.legacy_library || []).filter((it: any) => !it.is_fork)

  const forks = [
    ...(data?.active_labs || []).filter((it: any) => it.is_fork),
    ...(data?.production_ready || []).filter((it: any) => it.is_fork),
    ...(data?.legacy_library || []).filter((it: any) => it.is_fork),
  ]

  return (
    <section>
      <h2 className="text-xl font-medium mb-3">{title}</h2>
      {loading ? <div className="p-4">Loading...</div> : (
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-3 gap-4">
            <Column name="Active Labs" items={active} onOpenReadme={onOpenReadme} />
            <Column name="Production Ready" items={production} onOpenReadme={onOpenReadme} />
            <Column name="Legacy / Library" items={legacy} onOpenReadme={onOpenReadme} />
          </motion.div>

          {showForks && forks.length > 0 && (
            <motion.div layout className="mt-6">
              <h3 className="font-semibold mb-2">Forks <span className="muted">({forks.length})</span></h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm muted mb-2">Active Labs (Forks)</h4>
                  <div className="flex flex-col gap-2">
                    {((data?.active_labs || []).filter((it: any) => it.is_fork)).map((it: any) => (
                      <Card key={it.id} item={it} onOpenReadme={onOpenReadme} />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm muted mb-2">Production Ready (Forks)</h4>
                  <div className="flex flex-col gap-2">
                    {((data?.production_ready || []).filter((it: any) => it.is_fork)).map((it: any) => (
                      <Card key={it.id} item={it} onOpenReadme={onOpenReadme} />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm muted mb-2">Legacy / Library (Forks)</h4>
                  <div className="flex flex-col gap-2">
                    {((data?.legacy_library || []).filter((it: any) => it.is_fork)).map((it: any) => (
                      <Card key={it.id} item={it} onOpenReadme={onOpenReadme} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  )
}
