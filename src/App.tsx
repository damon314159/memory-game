import {
  type Dispatch,
  type SetStateAction,
  type MouseEvent,
  type KeyboardEvent,
  useState,
  useEffect
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
      if ('button' in e && (e.nativeEvent as PointerEvent).pointerType === '') {
        return
      }
      if (
        'key' in e &&
        (!['Enter', ' '].includes(e.key) || e.target !== document.activeElement)
      ) {
        return
      }
      console.log(e, e.target)
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
  const cardNum = 10
  const [items, setItems] = useState(
    Array.from(
      { length: cardNum },
      (): ClickableItem => ({
        ID: uuid(),
        imageURL: '',
        wasClicked: false
      })
    )
  )
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  useEffect((): void => {
    // eslint-disable-next-line no-void
    void (async (): Promise<void> => {
      const cats: Record<string, string>[] = await fetch(
        `https://api.thecatapi.com/v1/images/search?size=med&limit=${cardNum.toString()}&mime_types=jpg`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
            // 'x-api-key': 'Your-key'
          }
        }
      )
        .then((res): Promise<Record<string, string>[]> => res.json())
        .catch((err: unknown): Record<string, string>[] => {
          console.error(err)
          return []
        })
      setItems(
        items.map(
          (item: ClickableItem, i: number): ClickableItem => ({
            ...item,
            imageURL: cats[i]?.url ?? ''
          })
        )
      )
    })()
  }, [])

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
