'use client'
import { useEffect, useState } from 'react'

export default function AnalysisHistory() {
  const [history, setHistory] = useState([])
  const [expandedItems, setExpandedItems] = useState({})

  useEffect(() => {
    const saved = localStorage.getItem('palm-history')
    if (saved) {
      // 過濾掉 previewUrl，只保留文字結果
      const parsedHistory = JSON.parse(saved).map(item => ({
        timestamp: item.timestamp,
        result: item.result
      }))
      setHistory(parsedHistory)
    }
  }, [])

  const handleDelete = (index) => {
    const updated = [...history]
    updated.splice(index, 1)
    setHistory(updated)
    localStorage.setItem('palm-history', JSON.stringify(updated))
  }

  const toggleExpand = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
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
            <div className="relative">
              <p className="whitespace-pre-line text-sm text-gray-800">
                {expandedItems[index] ? item.result : truncateText(item.result)}
              </p>
              {item.result.length > 100 && (
                <button
                  onClick={() => toggleExpand(index)}
                  className="text-blue-500 hover:text-blue-700 text-sm mt-2"
                >
                  {expandedItems[index] ? 'less...' : 'more...'}
                </button>
              )}
            </div>
            <button
              onClick={() => handleDelete(index)}
              className="text-sm text-red-500 mt-2 hover:underline ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
