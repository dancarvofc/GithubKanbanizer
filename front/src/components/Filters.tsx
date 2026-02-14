import React from 'react'

export default function Filters({ languages = [], selectedLanguage, onSelectLanguage, showForks, onToggleForks }: { languages?: string[], selectedLanguage?: string | null, onSelectLanguage: (l: string | null)=>void, showForks: boolean, onToggleForks: ()=>void }){
  return (
    <div className="w-full">
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(() => {
          const sel = selectedLanguage === null
          return (
            <button onClick={() => onSelectLanguage(null)} style={sel ? { backgroundColor: 'var(--accent)', color: 'white', borderColor: 'transparent' } : undefined} className={`inline-block px-2 py-1 rounded text-xs ${!sel ? 'glass' : ''}`}>All</button>
          )
        })()}
        {languages.map(l => {
          const sel = selectedLanguage === l
          return (
            <button key={l} onClick={() => onSelectLanguage(l)} style={sel ? { backgroundColor: 'var(--accent)', color: 'white', borderColor: 'transparent' } : undefined} className={`inline-block px-2 py-1 rounded text-xs ${!sel ? 'glass' : ''}`}>{l}</button>
        )})}
      </div>

      <div className="mt-2 flex items-center gap-3">
        <label className="text-sm muted">Show Forks</label>
        <input type="checkbox" checked={showForks} onChange={onToggleForks} />
      </div>
    </div>
  )
}
