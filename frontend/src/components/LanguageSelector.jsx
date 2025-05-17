'use client'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="mb-4">
      <label className="mr-2 font-semibold">🌍 Language:</label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="en">English</option>
        <option value="zh-tw">繁體中文</option>
        <option value="zh-cn">简体中文</option>
      </select>
    </div>
  )
}
