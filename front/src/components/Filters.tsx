import React from 'react'

export default function Filters({ languages = [], selectedLanguage, onSelectLanguage, showForks, onToggleForks }: { languages?: string[], selectedLanguage?: string | null, onSelectLanguage: (l: string | null)=>void, showForks: boolean, onToggleForks: ()=>void }){
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-2">
        <button onClick={() => onSelectLanguage(null)} className={`px-3 py-1 rounded ${!selectedLanguage? 'text-white' : 'glass'}`}>All</button>
        {languages.map(l => (
          <button key={l} onClick={() => onSelectLanguage(l)} className={`px-3 py-1 rounded ${selectedLanguage===l? 'text-white' : 'glass'}`}>{l}</button>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <label className="text-sm muted">Show Forks</label>
        <input type="checkbox" checked={showForks} onChange={onToggleForks} />
      </div>
    </div>
  )
}
