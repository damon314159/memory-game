import './Scoreboard.css'

interface Props {
  score: number
  highScore: number
}

function Scoreboard({ score, highScore }: Props): JSX.Element {
  return (
    <>
      <div className="score">Current score: {score}</div>
      <div className="score">High score: {highScore}</div>
    </>
  )
}

export default Scoreboard
