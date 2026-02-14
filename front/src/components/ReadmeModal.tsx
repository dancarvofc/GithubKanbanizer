import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ReadmeModal({ open, owner, repo, onClose }: { open: boolean, owner?: string, repo?: string, onClose: ()=>void }){
  const [loading, setLoading] = useState(false)
  const [md, setMd] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open || !owner || !repo) return
    let mounted = true
    async function fetchReadme(){
      setLoading(true)
      setError(null)
      setMd(null)
      // Try backend first
      const base = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      try {
        const res = await fetch(`${base}/readme?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`)
        if (res.ok){
          const text = await res.text()
          if (mounted) setMd(text)
          return
        }
      } catch(e) {
        // ignore and fallback
      }

      // Fallback to raw GitHub: try HEAD, main, master
      const candidates = ["HEAD","main","master"]
      for (const branch of candidates){
        try{
          const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`
          const r = await fetch(url)
          if (r.ok){
            const text = await r.text()
            if (mounted) { setMd(text); return }
          }
        }catch(e){ /* continue */ }
      }

      if (mounted) setError('README not found')
      setLoading(false)
    }

    fetchReadme().finally(()=>{ if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [open, owner, repo])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-3xl max-h-[80vh] overflow-auto card p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">{owner}/{repo} — README</h3>
          <button className="glass px-3 py-1" onClick={onClose}>Close</button>
        </div>

        {loading && <div>Loading README...</div>}
        {error && <div className="text-red-400">{error}</div>}
        {md && (
          <div className="prose prose-invert html-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}
