'use client'
import { useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'

export default function SemanticSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // API call would go here
    setTimeout(() => {
      setResults([
        { id: 1, text: "The appellate court held that under Section 345 of the Code of Criminal Procedure, compounding of offences requires mutual consent...", case: "Abdul Karim vs State (2022)", distance: 0.12 },
        { id: 2, text: "Criminal Procedure Code distinguishes between compoundable and non-compoundable offences based on severity...", case: "State vs Jahangir (2021)", distance: 0.18 },
      ])
      setLoading(false)
    }, 800)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Semantic Search</h1>
        <p className="text-slate-400 mt-2">Paragraph-level relevance powered by multilingual embeddings</p>
      </div>

      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search legal principles, statutes, or case facts..."
          className="w-full bg-hayat-panel border border-slate-700 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-hayat-accent"
        />
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      </form>

      {loading && <div className="text-slate-400">Searching through 1.2M paragraphs...</div>}

      <div className="space-y-4">
        {results.map((res: any) => (
          <div key={res.id} className="bg-hayat-panel p-6 rounded-xl border border-slate-700 hover:border-hayat-accent transition-colors">
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm text-hayat-accent font-medium">{res.case}</span>
              <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">Relevance: {(1 - res.distance).toFixed(2)}%</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{res.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
