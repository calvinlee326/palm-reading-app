'use client'
import { useEffect, useState } from 'react'
import { endpoints } from '@/config/api'

export default function DailyFortune() {
  const [fortune, setFortune] = useState('')
  const [loading, setLoading] = useState(true)
  const [birthday, setBirthday] = useState('')
  const [showBirthdayInput, setShowBirthdayInput] = useState(false)

  useEffect(() => {
    const savedBirthday = localStorage.getItem('birthday')
    if (savedBirthday) {
      setBirthday(savedBirthday)
    } else {
      setShowBirthdayInput(true)
    }
  }, [])

  useEffect(() => {
    if (!birthday) {
      setFortune('Enter your birthday！')
      setLoading(false)
      return
    }

    const today = new Date().toISOString().split('T')[0]
    const cacheKey = `fortune-${today}`

    const cached = localStorage.getItem(cacheKey)
    if (cached) {
      setFortune(cached)
      setLoading(false)
      return
    }

    fetch(`${endpoints.dailyFortune}?birthday=${birthday}`)
      .then(res => res.json())
      .then(data => {
        if (data.fortune) {
          setFortune(data.fortune)
          localStorage.setItem(cacheKey, data.fortune)
        } else {
          setFortune('The stars are still sleeping... ✨')
        }
      })
      .catch(() => setFortune('Failed to get fortune'))
      .finally(() => setLoading(false))
  }, [birthday])

  const handleBirthdaySubmit = (e) => {
    e.preventDefault()
    const birthdayInput = e.target.birthday.value
    if (birthdayInput) {
      localStorage.setItem('birthday', birthdayInput)
      setBirthday(birthdayInput)
      setShowBirthdayInput(false)
    }
  }

  const handleChangeBirthday = () => {
    setShowBirthdayInput(true)
  }

  return (
    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-xl text-center shadow max-w-2xl mx-auto w-full">
      <h2 className="text-lg font-semibold mb-2">🔮 Today's Fortune</h2>
      
      {showBirthdayInput ? (
        <form onSubmit={handleBirthdaySubmit} className="mb-4">
          <input
            type="date"
            name="birthday"
            defaultValue={birthday}
            className="px-3 py-2 border rounded-lg mr-2 max-w-full sm:max-w-xs"
            required
          />
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 mt-2 sm:mt-0"
          >
            Confirm
          </button>
        </form>
      ) : (
        <>
          <div className="text-sm text-gray-600 mb-2">
            Birthday：{birthday}
            <button
              onClick={handleChangeBirthday}
              className="ml-2 text-blue-500 hover:text-blue-700 text-sm"
            >
              Change
            </button>
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">The stars are still sleeping... ✨</p>
          ) : (
            <p className="text-base px-4">{fortune}</p>
          )}
        </>
      )}
    </div>
  )
}
