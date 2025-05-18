import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
