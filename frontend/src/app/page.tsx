import { FileText, Database, Network, Scale } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    { label: 'Total Cases', value: '1,245', icon: FileText },
    { label: 'Statutes Indexed', value: '3,890', icon: Scale },
    { label: 'Graph Nodes', value: '45.2K', icon: Network },
    { label: 'Paragraphs', value: '1.2M', icon: Database },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Legal Intelligence Dashboard</h1>
        <p className="text-slate-400 mt-2">Hierarchical AI Taxonomy for Bangladesh Law</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-hayat-panel p-6 rounded-xl border border-slate-700 hover:border-hayat-accent transition-colors">
              <div className="flex justify-between items-start mb-4">
                <Icon className="w-8 h-8 text-hayat-accent" />
              </div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
            </div>
          )
        })}
      </div>

      <div className="bg-hayat-panel p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Pipeline Status</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-slate-300">OCR Engine (PaddleOCR)</span>
            <span className="ml-auto text-green-500">Operational</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-slate-300">Knowledge Graph (Neo4j)</span>
            <span className="ml-auto text-green-500">Operational</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
            <span className="text-slate-300">Vector Search (pgvector)</span>
            <span className="ml-auto text-yellow-500">Indexing...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
