import type { ReactNode } from 'react'

import { FloatingHeader } from '../catalog-stage/FloatingHeader'
import { SiteFooter } from './SiteFooter'

type PageChromeProps = {
  children: ReactNode
}

export function PageChrome({ children }: PageChromeProps) {
  return (
    <div className="site-page">
      <div className="header-overlay">
        <FloatingHeader />
      </div>
      {children}
      <SiteFooter />
    </div>
  )
}
