import {
  type Dispatch,
  type SetStateAction,
  type MouseEvent,
  type KeyboardEvent,
  useState
} from 'react'
import { v4 as uuid } from 'uuid'
import './App.css'
import type ClickableItem from './types/ClickableItem'
import ItemPanel from './components/itemPanel/ItemPanel'
import Scoreboard from './components/scoreboard/Scoreboard'

function clickHandlerFactoryFactory(
  items: ClickableItem[],
  setItems: Dispatch<SetStateAction<ClickableItem[]>>,
  score: number,
  setScore: Dispatch<SetStateAction<number>>,
  highScore: number,
  setHighScore: Dispatch<SetStateAction<number>>
): (ID: string) => (e: MouseEvent | KeyboardEvent) => void {
  // Provide state to returned clickHandlerFactory via closure.
  // This can be passed down with props
  return (ID: string): ((e: MouseEvent | KeyboardEvent) => void) =>
    (e: MouseEvent | KeyboardEvent): void => {
      if ('key' in e && e.key !== 'Enter') {
        return
      }
      // TODO Guard clause for no focus on KB event
      if (
        items.find((item: ClickableItem): boolean => item.ID === ID)?.wasClicked
      ) {
        setItems(
          items.map(
            (item: ClickableItem): ClickableItem => ({
              ...item,
              wasClicked: false
            })
          )
        )
        // TODO Shuffle array
        setHighScore(Math.max(score, highScore))
        setScore(0)
        return
      }
      setItems(
        items.map(
          (item: ClickableItem): ClickableItem =>
            item.ID === ID ? { ...item, wasClicked: true } : item
        )
      )
      // TODO Shuffle array
      setScore(score + 1)
    }
}

function App(): JSX.Element {
  const [items, setItems] = useState(
    Array.from(
      { length: 10 },
      (): ClickableItem => ({
        ID: uuid(),
        imageURL: '',
        wasClicked: false
      })
    )
  )
  // TODO Use Effect to fetch and insert URLS to state
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  return (
    <>
      <h1>Memory Game</h1>
      <Scoreboard score={score} highScore={highScore} />
      <ItemPanel
        items={items}
        clickHandlerFactory={clickHandlerFactoryFactory(
          items,
          setItems,
          score,
          setScore,
          highScore,
          setHighScore
        )}
      />
    </>
  )
}

export default App
