import React, { useState } from 'react'
import Header from '../components/Header'
import Board from '../components/Board'
import { useKanban } from '../hooks/useGitHubData'
import { useStarred } from '../hooks/useStarredData'
import { motion } from 'framer-motion'

export default function Home(){
  const [query, setQuery] = useState('')
  const [searchedUsername, setSearchedUsername] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'own'|'starred'>('own')

  const username = searchedUsername ? searchedUsername.trim() : ''
  const { data: ownData, isLoading: ownLoading } = useKanban(username, { enabled: !!username })
  const { data: starredData, isLoading: starredLoading } = useStarred(username, { enabled: !!username })

  function submit(e?: React.FormEvent){
    e?.preventDefault()
    const val = query.trim()
    if (val) setSearchedUsername(val)
  }

  return (
    <div className="min-h-screen">
      <Header onThemeToggle={() => { (window as any).toggleTheme?.() }} />

      <div className="container mx-auto p-4">
        {!searchedUsername ? (
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="flex flex-col items-center mt-20">
            <h1 className="text-4xl font-bold mb-6">GitHub Kanbanizer</h1>
            <form onSubmit={submit} className="w-full max-w-xl">
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Digite o username do GitHub e pressione Enter" className="w-full p-4 rounded shadow glass" />
            </form>
            <p className="mt-3 text-sm muted">Após a busca você verá seus projetos e os que você favoritou.</p>
          </motion.div>
        ) : (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            {ownData?.user && (
              <div className="mt-6 glass p-4 flex items-center gap-4 rounded">
                <img src={ownData.user.avatar_url} alt={ownData.user.name || 'avatar'} className="w-16 h-16 rounded-full" />
                <div>
                  <div className="font-semibold text-lg">{ownData.user.name || searchedUsername}</div>
                  {ownData.user.bio && <div className="muted">{ownData.user.bio}</div>}
                </div>
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <button onClick={() => setActiveTab('own')} style={{backgroundColor: activeTab === 'own' ? 'var(--accent)' : undefined}} className={`px-3 py-1 rounded ${activeTab==='own'? 'text-white' : 'glass'}`}>My Repos</button>
              <button onClick={() => setActiveTab('starred')} style={{backgroundColor: activeTab === 'starred' ? 'var(--accent)' : undefined}} className={`px-3 py-1 rounded ${activeTab==='starred'? 'text-white' : 'glass'}`}>Starred</button>
            </div>

            <div className="mt-6">
              {activeTab === 'own' ? (
                <Board title={`${username} — My Projects`} data={ownData?.columns} loading={ownLoading} />
              ) : (
                <Board title={`${username} — Starred Projects`} data={starredData?.columns} loading={starredLoading} />
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
