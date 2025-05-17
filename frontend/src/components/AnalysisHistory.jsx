'use client'
import { useEffect, useState } from 'react'

export default function AnalysisHistory() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('palm-history')
    if (saved) setHistory(JSON.parse(saved))
  }, [])

  const handleDelete = (index) => {
    const updated = [...history]
    updated.splice(index, 1)
    setHistory(updated)
    localStorage.setItem('palm-history', JSON.stringify(updated))
  }

  if (history.length === 0) return null

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 border rounded bg-white">
      <h2 className="text-xl font-semibold mb-4">🕓 Analysis History</h2>
      <ul className="space-y-4">
        {history.map((item, index) => (
          <li key={index} className="border p-4 rounded bg-gray-50">
            <p className="text-sm text-gray-600 mb-2">
              🕒 {new Date(item.timestamp).toLocaleString()}
            </p>
            {item.previewUrl && (
              <img
                src={item.previewUrl}
                alt="Palm Preview"
                className="w-full max-h-48 object-contain rounded border mb-2"
              />
            )}
            <p className="whitespace-pre-line text-sm text-gray-800 line-clamp-5">
              {item.result.slice(0, 300)}...
            </p>
            <button
              onClick={() => handleDelete(index)}
              className="text-sm text-red-500 mt-2 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
