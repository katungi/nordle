import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { createQualifiedName } from 'typescript';
import Lines from '../components/Lines';

const Home: NextPage = ({ words = [] }) => {

  const [solution, setSolution] = useState('')
  const [guesses, setGuesses] = useState(Array(6).fill(null))
  const [currentGuess, setCurrentGuess] = useState('')
  const [correctState, setCorrectState] = useState('')
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)]
    setSolution(randomWord.toLowerCase())
  }, [])

  useEffect(() => {
    const handleType = (event: { key: string; }) => {
      if (isGameOver) return
      if (event.key === 'Enter') {
        if (currentGuess.length !== 5) return
        const newGuesses = [...guesses]
        newGuesses[guesses.findIndex(val => val == null)] = currentGuess
        setGuesses(newGuesses)
        setCurrentGuess('')
        const isCorrect = solution === currentGuess;
        if (isCorrect) {
          setIsGameOver(true)
        }
      }

      if (event.key === 'Backspace') {
        setCurrentGuess(currentGuess.slice(0, -1))
        return
      }
      if (currentGuess.length >= 5) return
      setCurrentGuess(oldGuess => oldGuess + event.key);
    }
    window.addEventListener('keydown', handleType);
    return () => window.removeEventListener('keydown', handleType);
  }, [currentGuess, isGameOver, solution, guesses])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Nordle 🍋</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {/* <h4 className="text-3xl font-bold">
          Welcome to{' '}
          <a className="text-yellow-600">
            Nordle 🍋
          </a>
        </h4> */}

        <h2>Word is <span className="text-yellow-600">{solution}</span></h2>
        <div className='flex flex-col gap-1'>
          {guesses.map((guess, index) => {
            const isCurrentGuess = index === guesses.findIndex(val => val == null)
            return < Lines guess={isCurrentGuess ? currentGuess : guess ?? ''} isFinal={!isCurrentGuess && guess != null} solution={solution} />
          })}
          {isGameOver && <h1 className="text-yellow-600">Game OVer ⚠️</h1>}
        </div>
      </main>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const res = await fetch('https://api.frontendexpert.io/api/fe/wordle-words')
  const words = await res.json()

  return {
    props: { words }
  }
}