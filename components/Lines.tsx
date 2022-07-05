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
        status += 'bg-green-500 border-green-500'
      } else if (solution.includes(char)) {
        console.log('wrong place', char, solution[i])
        status += 'bg-yellow-500 border-green-500'
      } else {
        console.log('Njei', char, solution[i])
        status += 'bg-red-300 border-green-600'
      }
    }
    console.log(`⚡️ ${solution}`)
    tiles.push(<div key={i} className={`${status} w-16 h-16 pulse border-solid  border-2 text-4xl flex align-center uppercase justify-center font-bold text-white`}>{char}</div>)
  }
  return <div className='flex items-center justify-center gap-1'>
    {tiles}
  </div>
}
