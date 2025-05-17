'use client'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import imageCompression from 'browser-image-compression'


export default function ImagePalmForm() {
  const { language } = useLanguage()
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleImageChange = async (e) => {
  const file = e.target.files[0]
  if (file) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      fileType: 'image/jpeg'
    }

    try {
      const compressedFile = await imageCompression(file, options)
      setImageFile(compressedFile)
      setPreviewUrl(URL.createObjectURL(compressedFile))
    } catch (error) {
      alert('Failed to process image.')
    }
  }
}

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handleSubmit = async () => {
    if (!imageFile) {
      alert('Please upload an image.')
      return
    }

    setLoading(true)
    setResult('')

    try {
      const base64 = await convertToBase64(imageFile)

      const res = await fetch('http://localhost:8000/api/analyzePalmImage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_base64: base64 , language: language})
      })

      const data = await res.json()
      setResult(data.result || data.error)
    } catch (err) {
      setResult('Failed to analyze image.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 border rounded bg-white">
      <h2 className="text-xl font-semibold mb-4">🖼️ Upload Palm Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:border-blue-500 cursor-pointer"
      />

      {previewUrl && (
        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-1">Selected: {imageFile?.name}</p>
          <p className="text-sm text-gray-500 mb-1">Preview:</p>
          <img src={previewUrl} alt="Palm Preview" className="w-full rounded border" />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? 'Analyzing...' : '🔍 Analyze Palm from Image'}
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50 whitespace-pre-line">
          {result}
        </div>
      )}
    </div>
  )
}
