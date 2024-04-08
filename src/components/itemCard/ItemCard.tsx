import type { MouseEventHandler, KeyboardEventHandler } from 'react'
import './ItemCard.css'

interface Props {
  imageURL: string
  onClick: MouseEventHandler & KeyboardEventHandler
}

function ItemCard({ imageURL, onClick }: Props): JSX.Element {
  return (
    <div className="card">
      {/* Click handler can also handle focussed Enter presses for a11y */}
      <button
        type="button"
        onClick={onClick}
        onKeyDown={onClick}
        className="card-button"
      >
        <img src={imageURL} alt="Cat" className="card-image" />
      </button>
    </div>
  )
}

export default ItemCard
