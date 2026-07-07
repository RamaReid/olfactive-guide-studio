import { Link } from 'react-router'

import {
  highlightedProductNumbers,
  newsletterText,
  ommiAboutText,
  ommiTestimonials,
  secondaryExplorationLinks,
} from '../../data/ommiContent'
import { getLineById, ommiFragrances } from '../../data/ommiCatalog'
import { SiteFooter } from '../layout/SiteFooter'

const highlightedProducts = highlightedProductNumbers
  .map((number) =>
    ommiFragrances.find((fragrance) => fragrance.number === number),
  )
  .filter(Boolean)

const externalInstagramUrl = 'https://www.instagram.com/ommi.fragance/'

const isInternalPath = (href: string) => href.startsWith('/')

export function ExpandedOmmiSections() {
  return (
    <div className="ommi-expanded">
      <section className="ommi-section ommi-featured-section" aria-labelledby="destacados-title">
        <div className="ommi-section-heading">
          <p>Destacados</p>
          <h2 id="destacados-title">Fragancias con presencia</h2>
          <span>Seleccionadas desde el inventario actual de OMMI.</span>
        </div>

        <div className="ommi-featured-grid">
          {highlightedProducts.map((fragrance) => {
            if (!fragrance) return null

            const line = getLineById(fragrance.primaryEntryId)
            const href = `/perfumes/${line.slug}/${fragrance.slug}`

            return (
              <Link
                className="ommi-featured-card"
                to={href}
                key={fragrance.id}
              >
                <span className="ommi-featured-badges">
                  <span>Hasta 15% OFF</span>
                  <span>Envio gratis</span>
                </span>
                <span className="ommi-featured-media">
                  <img
                    src={line.assets.boxHint}
                    alt={`Caja OMMI N ${fragrance.number} ${fragrance.referenceName}`}
                  />
                </span>
                <span className="ommi-featured-copy">
                  <span className="ommi-featured-number">N°&nbsp;{fragrance.number}</span>
                  <strong>Inspired by {fragrance.referenceName}</strong>
                  <small>{fragrance.family}</small>
                  <span className="ommi-featured-price">$45.000,00</span>
                  <small>$40.500,00 con Transferencia o deposito</small>
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="ommi-section ommi-explore-section" aria-labelledby="explorar-title">
        <div className="ommi-section-heading">
          <p>Exploracion</p>
          <h2 id="explorar-title">Entradas rapidas al catalogo</h2>
        </div>
        <nav className="ommi-explore-grid" aria-label="Exploracion secundaria">
          {secondaryExplorationLinks.map((item) =>
            isInternalPath(item.href) ? (
              <Link className="ommi-explore-link" to={item.href} key={item.label}>
                <span>{item.label}</span>
                <small>{item.detail}</small>
              </Link>
            ) : (
              <a className="ommi-explore-link" href={item.href} key={item.label}>
                <span>{item.label}</span>
                <small>{item.detail}</small>
              </a>
            ),
          )}
        </nav>
      </section>

      <section className="ommi-section ommi-testimonials-section" aria-labelledby="experiencias-title">
        <div className="ommi-section-heading">
          <p>Experiencias OMMI</p>
          <h2 id="experiencias-title">Lo que queda despues de abrir la caja</h2>
        </div>
        <div className="ommi-testimonial-grid">
          {ommiTestimonials.map((testimonial) => (
            <article className="ommi-testimonial-card" key={testimonial.name}>
              <p>"{testimonial.quote}"</p>
              <strong>{testimonial.name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="ommi-section ommi-social-section" aria-labelledby="social-title">
        <div className="ommi-social-copy">
          <div className="ommi-social-text">
            <p>Instagram</p>
            <h2 id="social-title">OMMI.FRAGANCE</h2>
            <span>Estamos en Instagram. Seguinos para ver lanzamientos, sets y experiencias reales.</span>
            <a href={externalInstagramUrl} target="_blank" rel="noreferrer">
              Seguinos
            </a>
          </div>
          <div className="ommi-social-product">
            <img src="/ommi_other/OMMI%20Firma.png" alt="OMMI Firma" />
          </div>
        </div>
        <div className="ommi-social-media">
          <video src="/ommi_other/OMMI.mp4" autoPlay muted loop playsInline />
        </div>
      </section>

      <section className="ommi-section ommi-about-section" aria-labelledby="sobre-title">
        <div className="ommi-about-mark">OMMI</div>
        <div className="ommi-about-copy">
          <p>Sobre OMMI</p>
          <h2 id="sobre-title">Elegancia atemporal, extractos de alta concentracion</h2>
          <span>{ommiAboutText}</span>
        </div>
      </section>

      <section className="ommi-section ommi-newsletter-section" id="newsletter-ommi" aria-labelledby="newsletter-title">
        <div>
          <p>Newsletter</p>
          <h2 id="newsletter-title">{newsletterText}</h2>
        </div>
        <form
          className="ommi-newsletter-form"
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <label htmlFor="ommi-newsletter-email">Email</label>
          <div>
            <input id="ommi-newsletter-email" type="email" placeholder="tu@email.com" />
            <button type="submit">Suscribirme</button>
          </div>
        </form>
      </section>

      <SiteFooter />
    </div>
  )
}
