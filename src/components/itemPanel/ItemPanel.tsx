import type { MouseEvent, KeyboardEvent } from 'react'
import type ClickableItem from '../../types/ClickableItem'
import ItemCard from '../itemCard/ItemCard'
import shuffleArray from '../../helpers/shuffle'
import './ItemPanel.css'

interface Props {
  items: ClickableItem[]
  clickHandlerFactory: (ID: string) => (e: MouseEvent | KeyboardEvent) => void
}

function ItemPanel({ items, clickHandlerFactory }: Props): JSX.Element {
  return (
    <div id="item-panel" tabIndex={-1}>
      {shuffleArray(
        items.map(
          (item: ClickableItem): JSX.Element => (
            <ItemCard
              key={item.ID}
              imageURL={item.imageURL}
              // Click handler can also handle focussed Enter presses for a11y
              onClick={clickHandlerFactory(item.ID)}
            />
          )
        )
      )}
    </div>
  )
}

export default ItemPanel
