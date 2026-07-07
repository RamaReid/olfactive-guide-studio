import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router'

export function FloatingHeader() {
  return (
    <header className="header-inner">
      <Link className="header-logo" to="/" aria-label="OMMI home">
        OMMI
      </Link>

      <nav className="header-nav" aria-label="Navegación principal">
        <Link className="header-nav-link" to="/guia">
          Guía
        </Link>
        <span className="header-nav-separator" aria-hidden="true">
          ·
        </span>
        <Link className="header-nav-link" to="/confianza">
          Calidad
        </Link>
        <span className="header-nav-separator" aria-hidden="true">
          ·
        </span>
        <Link className="header-nav-link" to="/ayuda">
          Ayuda
        </Link>
      </nav>

      <button className="header-cart" type="button" aria-label="Carrito">
        <ShoppingBag size={17} strokeWidth={1.8} />
        <span className="header-cart-label">Carrito</span>
        <span className="header-cart-count">0</span>
      </button>
    </header>
  )
}
