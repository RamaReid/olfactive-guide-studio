import { Link } from 'react-router'

import { footerNavigation, paymentMethods } from '../../data/ommiContent'

const externalInstagramUrl = 'https://www.instagram.com/ommi.fragance/'

const isInternalPath = (href: string) => href.startsWith('/')

export function SiteFooter() {
  return (
    <footer className="ommi-footer">
      <div className="ommi-footer-brand">
        <strong>OMMI</strong>
        <span>Extractos de parfum disenados para dejar una huella inolvidable.</span>
        <a href={externalInstagramUrl} target="_blank" rel="noreferrer">
          Instagram
        </a>
      </div>

      <div className="ommi-footer-nav">
        {footerNavigation.map((group) => (
          <nav aria-label={group.title} key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map((item) =>
              isInternalPath(item.href) ? (
                <Link to={item.href} key={item.label}>
                  {item.label}
                </Link>
              ) : (
                <a href={item.href} key={item.label}>
                  {item.label}
                </a>
              ),
            )}
          </nav>
        ))}
      </div>

      <div className="ommi-footer-payments">
        <h3>Medios de pago</h3>
        <div>
          {paymentMethods.map((method) => (
            <span key={method}>{method}</span>
          ))}
        </div>
      </div>

      <div className="ommi-footer-legal">
        <span>Copyright OMMI - 30714309427 - 2026. Todos los derechos reservados.</span>
        <a
          href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario"
          target="_blank"
          rel="noreferrer"
        >
          Defensa de las y los consumidores
        </a>
        <Link to="/boton-de-arrepentimiento">Boton de arrepentimiento</Link>
      </div>
    </footer>
  )
}
