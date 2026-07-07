import { CatalogStage } from '../components/catalog-stage/CatalogStage'
import { ConjuntosOmmiSection } from '../components/sections/ConjuntosOmmiSection'
import { CookieConsent } from '../components/sections/CookieConsent'
import { ExpandedOmmiSections } from '../components/sections/ExpandedOmmiSections'

export function Home() {
  return (
    <>
      <CatalogStage />
      <ConjuntosOmmiSection />
      <ExpandedOmmiSections />
      <CookieConsent />
    </>
  )
}
