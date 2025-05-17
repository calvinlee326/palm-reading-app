'use client'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'


export default function PalmForm() {
  const { language } = useLanguage()
  const [lifeLine, setLifeLine] = useState('')
  const [heartLine, setHeartLine] = useState('')
  const [headLine, setHeadLine] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [customLifeLine, setCustomLifeLine] = useState('')
  const [customHeartLine, setCustomHeartLine] = useState('')
  const [customHeadLine, setCustomHeadLine] = useState('')

  const handleSubmit = async () => {
    if (!lifeLine || !heartLine || !headLine) {
      alert('Please select all three palm lines.')
      return
    }

    setLoading(true)
    setResult('')

    try {
      const res = await fetch('http://localhost:8000/api/analyzePalm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          life_line: lifeLine === 'custom' ? customLifeLine : lifeLine,
          heart_line: heartLine === 'custom' ? customHeartLine : heartLine,
          head_line: headLine === 'custom' ? customHeadLine : headLine,
          language: language
        })
      })

      const data = await res.json()
      setResult(data.result || data.error)
    } catch (err) {
      setResult('Server error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🖐️ AI Palm Reader</h1>

      <label className="block mt-4">Life Line:</label>
      <select 
        value={lifeLine} 
        onChange={e => setLifeLine(e.target.value)} 
        className="border w-full p-2 rounded mb-2"
      >
        <option value="">-- Select --</option>
        <option value="long and clear">Long and clear</option>
        <option value="short and blurry">Short and blurry</option>
        <option value="curved and extends to wrist">Curved and extends to wrist</option>
        <option value="custom">Custom description...</option>
      </select>
      {lifeLine === 'custom' && (
        <input
          type="text"
          value={customLifeLine}
          onChange={e => setCustomLifeLine(e.target.value)}
          placeholder="Describe the life line (e.g., deep, shallow, broken...)"
          className="border w-full p-2 rounded focus:outline-none focus:border-blue-500"
        />
      )}

      <label className="block mt-4">Heart Line:</label>
      <select 
        value={heartLine} 
        onChange={e => setHeartLine(e.target.value)} 
        className="border w-full p-2 rounded mb-2"
      >
        <option value="">-- Select --</option>
        <option value="deep and curved">Deep and curved</option>
        <option value="short and straight">Short and straight</option>
        <option value="broken or fragmented">Broken or fragmented</option>
        <option value="custom">Custom description...</option>
      </select>
      {heartLine === 'custom' && (
        <input
          type="text"
          value={customHeartLine}
          onChange={e => setCustomHeartLine(e.target.value)}
          placeholder="Describe the heart line (e.g., wavy, chained, starred...)"
          className="border w-full p-2 rounded focus:outline-none focus:border-blue-500"
        />
      )}

      <label className="block mt-4">Head Line:</label>
      <select 
        value={headLine} 
        onChange={e => setHeadLine(e.target.value)} 
        className="border w-full p-2 rounded mb-2"
      >
        <option value="">-- Select --</option>
        <option value="short and straight">Short and straight</option>
        <option value="long and curved">Long and curved</option>
        <option value="overlaps with life line">Overlaps with life line</option>
        <option value="custom">Custom description...</option>
      </select>
      {headLine === 'custom' && (
        <input
          type="text"
          value={customHeadLine}
          onChange={e => setCustomHeadLine(e.target.value)}
          placeholder="Describe the head line (e.g., forked, islanded, thin...)"
          className="border w-full p-2 rounded focus:outline-none focus:border-blue-500"
        />
      )}

      <button 
        onClick={handleSubmit} 
        className="bg-indigo-600 text-white px-4 py-2 rounded mt-6 hover:bg-indigo-700"
      >
        {loading ? 'Analyzing...' : '🔍 Analyze Palm'}
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50 whitespace-pre-line">
          {result}
        </div>
      )}
    </div>
  )
}
