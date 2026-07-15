import { BookOpen, CheckSquare, FileText, History } from 'lucide-react'

export default function StatuteDossier({ params }: { params: { id: string } }) {
  const dossier = {
    act: "Penal Code, 1860",
    section: "Section 375",
    text: "A man is said to commit rape...",
    elements: ["Intercourse", "Lack of consent", "Age of victim"],
    cases: ["State vs Jamil (2019)", "Rafiqul vs State (2021)"]
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="border-b border-slate-700 pb-6">
        <div className="flex items-center gap-3 text-hayat-accent mb-2">
          <BookOpen className="w-6 h-6" />
          <span>Statute Intelligence</span>
        </div>
        <h1 className="text-3xl font-bold text-white">{dossier.act} - {dossier.section}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-hayat-panel p-6 rounded-xl border border-slate-700">
            <div className="flex items-center gap-2 mb-4 text-white font-semibold">
              <FileText className="w-5 h-5" /> Section Text
            </div>
            <p className="text-slate-300 leading-relaxed">{dossier.text}</p>
          </div>

          <div className="bg-hayat-panel p-6 rounded-xl border border-slate-700">
            <div className="flex items-center gap-2 mb-4 text-white font-semibold">
              <CheckSquare className="w-5 h-5" /> Essential Elements
            </div>
            <ul className="space-y-3">
              {dossier.elements.map((el, i) => (
                <li key={i} className="flex items-center text-slate-300">
                  <span className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-xs mr-3">{i+1}</span>
                  {el}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-hayat-panel p-6 rounded-xl border border-slate-700">
            <div className="flex items-center gap-2 mb-4 text-white font-semibold">
              <History className="w-5 h-5" /> Interpretation History
            </div>
            <div className="space-y-3">
              {dossier.cases.map((c, i) => (
                <div key={i} className="p-3 bg-slate-800 rounded-lg text-slate-300 text-sm">{c}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
