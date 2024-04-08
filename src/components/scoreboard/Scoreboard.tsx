import './Scoreboard.css'

interface Props {
  score: number
  highScore: number
}

function Scoreboard({ score, highScore }: Props): JSX.Element {
  return (
    <>
      <div>Current score: {score}</div>
      <div>High score: {highScore}</div>
    </>
  )
}

export default Scoreboard
