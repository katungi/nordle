interface guessType {
  guess: string
}

export default function Lines({ guess }: guessType) {
  const tiles = []
  const WORD_LENGTH = 5

  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i]
    console.log(char)
    tiles.push(<div key={i} className="w-8 h-8 border-solid border-black border-2 text-base flex align-center uppercase justify-center font-bold">{char}</div>)
  }
  return <div className='flex items-center justify-center gap-1'>
    {tiles}
  </div>
}