import React from 'react'
import { SunIcon, MoonIcon } from './icons'

export default function Header({ onThemeToggle }: { onThemeToggle?: ()=>void }){
  return (
    <header className="flex items-center justify-between p-4 glass">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-white font-bold">GK</div>
        <h1 className="text-2xl font-semibold">GitHub Kanbanizer</h1>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onThemeToggle && onThemeToggle()} className="p-2 rounded hover:bg-white/6">
          <MoonIcon />
        </button>
      </div>
    </header>
  )
}
