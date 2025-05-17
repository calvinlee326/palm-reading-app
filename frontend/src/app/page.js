import PalmForm from '@/components/PalmForm'
import ImagePalmForm from '@/components/ImagePalmForm'
import AnalysisHistory from '@/components/AnalysisHistory'
import LanguageSelector from '@/components/LanguageSelector'

export default function Home() {
  return (
    <main>
      <PalmForm />
      <ImagePalmForm />
      <AnalysisHistory />
    </main>
  )
}
