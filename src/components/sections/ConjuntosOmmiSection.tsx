const conjuntosBanners = [
  {
    href: '/conjuntos/pack-10-decants',
    src: '/ommi_other/herointerno2.webp',
    alt: 'Pack 10 Decants a eleccion OMMI',
  },
  {
    href: '/conjuntos/2-perfumes-100ml',
    src: '/ommi_other/herointerno1.webp',
    alt: 'Promocion especial 2 perfumes 100 ml OMMI',
  },
]

const comboBanner = {
  href: '/conjuntos/100ml-3-decants',
  bottleSrc: '/ommi_other/OMMI Dia.png',
  discoverySrc: '/ommi_other/OMMI Discobery Set dia.png',
}

export function ConjuntosOmmiSection() {
  return (
    <section className="conjuntos-section" aria-labelledby="conjuntos-ommi-title">
      <div className="conjuntos-inner">
        <div className="conjuntos-header">
          <p className="conjuntos-heading">Conjuntos</p>
          <h2 className="conjuntos-title" id="conjuntos-ommi-title">
            CONJUNTOS OMMI
          </h2>
          <p className="conjuntos-subtitle">
            Formas de probar, combinar y regalar tus fragancias.
          </p>
        </div>
        <div className="conjuntos-banner-list">
          {conjuntosBanners.map((banner) => (
            <a className="conjuntos-banner-link" href={banner.href} key={banner.href}>
              <img
                className="conjuntos-banner-image"
                src={banner.src}
                alt={banner.alt}
              />
            </a>
          ))}
          <a className="conjuntos-banner-link conjuntos-combo-banner" href={comboBanner.href}>
            <span className="conjuntos-combo-copy">
              <span>Combo a eleccion</span>
              <strong>
                OMMI 100 ml
                <span>3 Decants</span>
              </strong>
              <span>Una botella principal y tres fragancias para descubrir.</span>
            </span>
            <span className="conjuntos-combo-media" aria-hidden="true">
              <span className="conjuntos-combo-image-frame">
                <img
                  className="conjuntos-combo-image"
                  src={comboBanner.bottleSrc}
                  alt=""
                />
              </span>
              <span className="conjuntos-combo-image-frame">
                <img
                  className="conjuntos-combo-image"
                  src={comboBanner.discoverySrc}
                  alt=""
                />
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
