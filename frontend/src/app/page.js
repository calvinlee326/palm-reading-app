import PalmForm from '@/components/PalmForm'
import ImagePalmForm from '@/components/ImagePalmForm'
import AnalysisHistory from '@/components/AnalysisHistory'
import LanguageSelector from '@/components/LanguageSelector'
import DailyFortune from '@/components/DailyFortune'

export default function Home() {
  return (
    <main className="p-4">
      <DailyFortune />
      <PalmForm />
      <ImagePalmForm />
      <AnalysisHistory />
    </main>
  )
}
