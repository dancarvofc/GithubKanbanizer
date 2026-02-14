import React, { useState } from 'react'
import Header from '../components/Header'
import Board from '../components/Board'
import Filters from '../components/Filters'
import QuickStats from '../components/QuickStats'
import ReadmeModal from '../components/ReadmeModal'
import { useKanban } from '../hooks/useGitHubData'
import { useStarred } from '../hooks/useStarredData'
import { motion } from 'framer-motion'

export default function Home(){
  const [query, setQuery] = useState('')
  const [searchedUsername, setSearchedUsername] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'own'|'starred'>('own')
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [showForks, setShowForks] = useState(true)
  const [readmeOpen, setReadmeOpen] = useState(false)
  const [readmeOwner, setReadmeOwner] = useState<string | undefined>()
  const [readmeRepo, setReadmeRepo] = useState<string | undefined>()

  const username = searchedUsername ? searchedUsername.trim() : ''
  const { data: ownData, isLoading: ownLoading } = useKanban(username, { enabled: !!username })
  const { data: starredData, isLoading: starredLoading } = useStarred(username, { enabled: !!username })
  const currentColumns = activeTab === 'own' ? ownData?.columns : starredData?.columns

  const stats = React.useMemo(() => {
    const cols = currentColumns
    if (!cols) return undefined
    const all = [ ...(cols.active_labs || []), ...(cols.production_ready || []), ...(cols.legacy_library || []) ]
    const totalStars = all.reduce((s: number, it: any) => s + (it.stars || 0), 0)
    const forks = all.filter((it: any) => it.is_fork).length
    // determine top language
    const langCount: Record<string, number> = {}
    all.forEach((it: any) => { if (it.language) langCount[it.language] = (langCount[it.language] || 0) + 1 })
    const topLanguage = Object.keys(langCount).sort((a,b)=> (langCount[b]||0)-(langCount[a]||0))[0] || null
    return { stars: totalStars, forks, topLanguage }
  }, [currentColumns, activeTab])

  // derive available languages from the unfiltered columns so filter buttons
  // include all possibilities even if some columns are filtered out
  const allColumns = activeTab === 'own' ? ownData?.columns : starredData?.columns
  const languages = React.useMemo(() => {
    const set = new Set<string>()
    const cols = allColumns
    if (!cols) return [] as string[]
    const all = [ ...(cols.active_labs || []), ...(cols.production_ready || []), ...(cols.legacy_library || []) ]
    all.forEach((it: any) => { if (it.language) set.add(it.language) })
    return Array.from(set).sort()
  }, [allColumns, activeTab])

  // apply selected language and forks visibility to produce filteredColumns
  const filteredColumns = React.useMemo(() => {
    const cols = currentColumns
    if (!cols) return undefined
    function filterList(list: any[]){
      return list.filter((it: any) => {
        if (!showForks && it.is_fork) return false
        if (selectedLanguage && it.language !== selectedLanguage) return false
        return true
      })
    }
    return {
      active_labs: filterList(cols.active_labs || []),
      production_ready: filterList(cols.production_ready || []),
      legacy_library: filterList(cols.legacy_library || [])
    }
  }, [currentColumns, selectedLanguage, showForks])

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
              <div className="flex items-center justify-between gap-4 mb-4">
                <Filters languages={languages} selectedLanguage={selectedLanguage} onSelectLanguage={setSelectedLanguage} showForks={showForks} onToggleForks={() => setShowForks(s=>!s)} />
                <QuickStats stats={stats} />
              </div>

              {activeTab === 'own' ? (
                <Board title={`${username} — My Projects`} data={filteredColumns ?? ownData?.columns} loading={ownLoading} onOpenReadme={(owner, repo) => { setReadmeOwner(owner); setReadmeRepo(repo); setReadmeOpen(true) }} showForks={showForks} />
              ) : (
                <Board title={`${username} — Starred Projects`} data={filteredColumns ?? starredData?.columns} loading={starredLoading} onOpenReadme={(owner, repo) => { setReadmeOwner(owner); setReadmeRepo(repo); setReadmeOpen(true) }} showForks={showForks} />
              )}
              
              {/* Change user button */}
              <div className="mt-4">
                <button className="glass px-3 py-1" onClick={() => { setSearchedUsername(null); setQuery(''); setSelectedLanguage(null); setShowForks(true) }}>Change User</button>
              </div>
              <ReadmeModal open={readmeOpen} owner={readmeOwner} repo={readmeRepo} onClose={() => setReadmeOpen(false)} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
