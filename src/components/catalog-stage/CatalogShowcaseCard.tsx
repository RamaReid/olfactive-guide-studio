import { Link } from 'react-router'

type CatalogShowcaseCardProps = {
  href: string
  imageSrc: string
  imageAlt: string
  number?: string
  title: string
  subtitle: string
  brandLine?: string
  price?: string
  installmentText?: string
  notes?: string
}

export function CatalogShowcaseCard({
  href,
  imageSrc,
  imageAlt,
  number,
  title,
  subtitle,
  brandLine,
  price,
  installmentText,
  notes,
}: CatalogShowcaseCardProps) {
  return (
    <Link className="ommi-featured-card catalog-card" to={href}>
      <span className="ommi-featured-badges">
        <span>Hasta 15% OFF</span>
        <span>Envio gratis</span>
      </span>
      <span className="ommi-featured-media catalog-card-media">
        <img src={imageSrc} alt={imageAlt} />
      </span>
      <span className="ommi-featured-copy">
        {number ? <span className="ommi-featured-number">N°&nbsp;{number}</span> : null}
        <strong>{title}</strong>
        <small>{subtitle}</small>
        {brandLine ? <small>{brandLine}</small> : null}
        {price ? <span className="ommi-featured-price">{price}</span> : null}
        {installmentText ? <small>{installmentText}</small> : null}
        {notes ? <small>{notes}</small> : null}
      </span>
    </Link>
  )
}
