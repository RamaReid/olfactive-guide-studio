import { Route, Routes } from 'react-router'

import { AudiencePerfumesPage } from './pages/AudiencePerfumesPage'
import { DiscoveryPage } from './pages/DiscoveryPage'
import { Home } from './pages/Home'
import { InfoPage } from './pages/InfoPage'
import { LineCatalogPage } from './pages/LineCatalogPage'
import { PerfumesPage } from './pages/PerfumesPage'
import { ProductPage } from './pages/ProductPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/perfumes" element={<PerfumesPage />} />
      <Route
        path="/perfumes/masculinos"
        element={<AudiencePerfumesPage audience="masculino" />}
      />
      <Route
        path="/perfumes/femeninos"
        element={<AudiencePerfumesPage audience="femenino" />}
      />
      <Route
        path="/perfumes/unisex"
        element={<AudiencePerfumesPage audience="unisex" />}
      />
      <Route path="/perfumes/:lineSlug" element={<LineCatalogPage />} />
      <Route path="/perfumes/:lineSlug/:fragranceSlug" element={<ProductPage />} />
      <Route path="/sets/discovery" element={<DiscoveryPage />} />
      <Route
        path="/guia"
        element={
          <InfoPage
            kicker="GuÃ­a"
            title="Elegir por uso, piel y carÃ¡cter"
            body="Esta ruta queda preparada para explicar cÃ³mo cruzar ocasiÃ³n, familia olfativa, intensidad y audiencia antes de elegir."
            artwork={{
              src: '/ommi_other/OMMI Dia.png',
              alt: 'Caja OMMI DÃ­a',
            }}
          />
        }
      />
      <Route
        path="/confianza"
        element={
          <InfoPage
            kicker="Confianza"
            title="Evidencia visible"
            body="Esta secciÃ³n queda reservada para trazabilidad, conservaciÃ³n, concentraciÃ³n, lotes y criterios de calidad."
            artwork={{
              src: '/ommi_other/OMMI Firma.png',
              alt: 'Caja OMMI Firma',
            }}
          />
        }
      />
      <Route
        path="/sobre-ommi"
        element={
          <InfoPage
            kicker="Sobre OMMI"
            title="Sistema olfativo OMMI"
            body="OMMI se organiza como una arquitectura de elecciÃ³n, no como una lista plana de referencias."
            artwork={{
              src: '/ommi_other/OMMI Firma.png',
              alt: 'Caja OMMI Firma',
            }}
          />
        }
      />
      <Route
        path="/ayuda"
        element={
          <InfoPage
            kicker="Ayuda"
            title="Comprar en OMMI"
            body="Accesos a como comprar, preguntas frecuentes, devoluciones, contacto y seguimiento de tu compra."
            artwork={{
              src: '/ommi_other/OMMI Discobery Set dia.png',
              alt: 'Discovery Set OMMI DÃ­a',
            }}
          />
        }
      />
      <Route
        path="/como-comprar"
        element={
          <InfoPage
            kicker="Compras"
            title="Como comprar"
            body="Ruta preparada para explicar el proceso de compra, envio y medios de pago."
            artwork={{
              src: '/ommi_other/OMMI Discobery Set Regalo.png',
              alt: 'Discovery Set OMMI Regalo',
            }}
          />
        }
      />
      <Route
        path="/preguntas-frecuentes"
        element={
          <InfoPage
            kicker="Ayuda"
            title="Preguntas frecuentes"
            body="Ruta preparada para resolver dudas habituales antes y despues de comprar."
            artwork={{
              src: '/ommi_other/OMMI Discobery Set Noche .png',
              alt: 'Discovery Set OMMI Noche',
            }}
          />
        }
      />
      <Route
        path="/politica-de-devolucion-y-reembolso"
        element={
          <InfoPage
            kicker="Compras"
            title="Politica de devolucion y reembolso"
            body="Ruta preparada para condiciones de cambios, devoluciones y reembolsos."
            artwork={{
              src: '/ommi_other/OMMI Discobery Set piel.png',
              alt: 'Discovery Set OMMI Piel',
            }}
          />
        }
      />
      <Route
        path="/aviso-legal"
        element={
          <InfoPage
            kicker="Legales"
            title="Aviso legal"
            body="Los productos mencionados son una guia y no deben confundirse con marcas de disenador o marcas de nicho."
            artwork={{
              src: '/ommi_other/OMMI Regalo.png',
              alt: 'Caja OMMI Regalo',
            }}
          />
        }
      />
      <Route
        path="/politica-de-privacidad"
        element={
          <InfoPage
            kicker="Legales"
            title="Politica de privacidad"
            body="Ruta preparada para la politica de privacidad de OMMI."
            artwork={{
              src: '/ommi_other/OMMI Firma.png',
              alt: 'Caja OMMI Firma',
            }}
          />
        }
      />
      <Route
        path="/terminos-y-condiciones-de-uso"
        element={
          <InfoPage
            kicker="Legales"
            title="Terminos y condiciones de uso"
            body="Ruta preparada para los terminos y condiciones de uso."
            artwork={{
              src: '/ommi_other/OMMI Firma.png',
              alt: 'Caja OMMI Firma',
            }}
          />
        }
      />
      <Route
        path="/carrito"
        element={
          <InfoPage
            kicker="Carrito"
            title="Carrito de compras"
            body="El carrito de compras esta vacio."
            artwork={{
              src: '/ommi_other/OMMI Firma.png',
              alt: 'Caja OMMI Firma',
            }}
          />
        }
      />
      <Route
        path="/contacto"
        element={
          <InfoPage
            kicker="Contacto"
            title="Contactanos"
            body="WhatsApp 541126036564. Telefono: +5491126036564. Palermo, CABA."
            artwork={{
              src: '/ommi_other/OMMI Regalo.png',
              alt: 'Caja OMMI Regalo',
            }}
          />
        }
      />
      <Route
        path="/boton-de-arrepentimiento"
        element={
          <InfoPage
            kicker="Compras"
            title="Boton de arrepentimiento"
            body="Ruta preparada para iniciar una solicitud de arrepentimiento de compra."
            artwork={{
              src: '/ommi_other/OMMI Discobery Set Regalo.png',
              alt: 'Discovery Set OMMI Regalo',
            }}
          />
        }
      />
      <Route
        path="/conjuntos/pack-10-decants"
        element={
          <InfoPage
            kicker="Conjuntos OMMI"
            title="Pack 10 Decants a eleccion"
            body="Pack promocional de 10 decants a eleccion."
            artwork={{
              src: '/ommi_other/OMMI Discobery Set dia.png',
              alt: 'Discovery Set OMMI DÃ­a',
            }}
          />
        }
      />
      <Route
        path="/conjuntos/2-perfumes-100ml"
        element={
          <InfoPage
            kicker="Conjuntos OMMI"
            title="2 OMMI a eleccion de 100 ml"
            body="Promocion especial de dos fragancias OMMI de 100 ml."
            artwork={{
              src: '/ommi_other/OMMI Discobery Set Firma (2).png',
              alt: 'Discovery Set OMMI Firma',
            }}
          />
        }
      />
      <Route
        path="/conjuntos/100ml-3-decants"
        element={
          <InfoPage
            kicker="Conjuntos OMMI"
            title="OMMI 100 ml + 3 Decants a eleccion"
            body="Una fragancia OMMI de 100 ml y tres decants para descubrir."
            artwork={{
              src: '/ommi_other/OMMI Discobery Set dia.png',
              alt: 'Discovery Set OMMI DÃ­a',
            }}
          />
        }
      />
    </Routes>
  )
}

export default App
