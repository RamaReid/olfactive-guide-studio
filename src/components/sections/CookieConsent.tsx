import { useEffect, useState } from 'react'

const storageKey = 'ommi-cookie-consent'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(window.localStorage.getItem(storageKey) !== 'accepted')
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className="ommi-cookie-bar" role="status">
      <span>
        Al navegar por este sitio aceptás el uso de cookies para agilizar tu experiencia de compra.
      </span>
      <button
        type="button"
        onClick={() => {
          window.localStorage.setItem(storageKey, 'accepted')
          setIsVisible(false)
        }}
      >
        Entendido
      </button>
    </div>
  )
}
