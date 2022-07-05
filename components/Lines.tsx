interface guessType {
  guess: string,
  isFinal: boolean,
  solution: string
}

export default function Lines({ guess, isFinal, solution }: guessType) {
  const tiles = []
  const WORD_LENGTH = 5
  let status = '';
  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i]
    if (isFinal) {
      if (char === solution[i]) {
        console.log('correct', char, solution[i])
        status += 'bg-green-500 '
      } else if (solution.includes(char)) {
        console.log('wrong place', char, solution[i])
        status += 'bg-yellow-500 '
      } else {
        console.log('Njei', char, solution[i])
        status += 'bg-grey-800 '
      }
    }
    console.log(`⚡️ ${solution}`)
    tiles.push(<div key={i} className={`${status} w-8 h-8 border-solid border-black border-2 text-base flex align-center uppercase justify-center font-bold`}>{char}</div>)
  }
  return <div className='flex items-center justify-center gap-1'>
    {tiles}
  </div>
}
