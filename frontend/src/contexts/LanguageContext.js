'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('zh-tw')) setLanguage('zh-tw')
    else if (browserLang.startsWith('zh')) setLanguage('zh-cn')
    else setLanguage('en')
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
