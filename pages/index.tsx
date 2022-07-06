import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import KeyboardReact from 'react-simple-keyboard';
import { createQualifiedName } from 'typescript';
import Celebrate from '../components/Celebrate';
import Lines from '../components/Lines';

export default function Home({ words = [] }) {

  const [solution, setSolution] = useState('')
  const [guesses, setGuesses] = useState(Array(6).fill(null))
  const [currentGuess, setCurrentGuess] = useState('')
  const [correctState, setCorrectState] = useState('')
  const [isGameOver, setIsGameOver] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [virtualInput, setVirtualInput] = useState('')

  const layout = {
    'default': [
      'q w e r t y u i o p',
      'a s d f g h j k l',
      '{enter} z x c v b n m {bksp}',
    ],
  }

  function refreshPage() {
    if (window) {
      window.location.reload()
    }
  }

  useEffect(() => {
    const randomWord: string = words[Math.floor(Math.random() * words.length)]
    setSolution(randomWord.toLowerCase())
  }, [])

  useEffect(() => {
    const handleType = (event: { key: string; }) => {
      setIsEmpty(false)
      if (isGameOver) return
      if (event.key === 'Enter') {
        if (currentGuess.length === 0) { setIsEmpty(true) }
        if (currentGuess.length !== 5) return
        const newGuesses = [...guesses]
        newGuesses[guesses.findIndex(val => val == null)] = currentGuess
        setGuesses(newGuesses)
        setCurrentGuess('')
        const isCorrect = solution === currentGuess;
        if (isCorrect) {
          setIsGameOver(true)
        }

        // if (guesses.findIndex(currentGuess) === guesses.length - 1) {
        //   console.log('Game Over ⚠️')
        // }
      }

      const isLetter = event.key.match(/^[a-z]{1}$/) != null

      if (isLetter) {
        setCurrentGuess(oldGuess => oldGuess + event.key)
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

  const handleVirtualType = (input: string) => {
    console.log(input, currentGuess)
    setIsEmpty(false)
    if (isGameOver) return
    if (input === '{enter}') {
      if (currentGuess.length === 0) { setIsEmpty(true) }
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

    if (input === '{bksp}') {
      setCurrentGuess(currentGuess.slice(0, -1))
      return
    }
    if (currentGuess.length >= 5) return
    setCurrentGuess(oldGuess => oldGuess + input);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-black">
      <Head>
        <title>Nordle 🍋</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-screen flex flex-1 flex-col items-center justify-center px-20 text-center">
        <div className='m-10 text-2xl'>
          <h2 className='text-white'>Welcome to <span className="text-yellow-600">Nordle 🍋</span></h2>
        </div>

        <div className='flex flex-col gap-1' id='grid'>
          {isGameOver && <div className='relative z-0'>
            <Celebrate />
          </div>}
          <div className={isGameOver ? 'absolute p-8 z-10' : ''}>
            {guesses.map((guess, index) => {
              const isCurrentGuess = index === guesses.findIndex(val => val == null)
              return < Lines key={index} guess={isCurrentGuess ? currentGuess : guess ?? ''} isFinal={!isCurrentGuess && guess != null} solution={solution} isEmpty={isEmpty} />
            })}
          </div>
          {isGameOver &&
            <div className='m-3'>
              <h1 className="text-yellow-600 font-bold m-2 text-2xl">You Got it! 💖</h1>
              <button
                onClick={refreshPage}
                className="text-yellow-600 w-24 h-12 border-solid border-yellow-600 bg-black border-2 rounded-full"><p className='font-bold text-base'>RESTART</p> </button>
            </div>
          }
          {isEmpty && <h1 className="text-yellow-600">start typing a word ⚠️</h1>}
        </div>
      </main>

      <KeyboardReact
        onKeyPress={(button: any) => handleVirtualType(button)}
        theme={'hg-theme-default hg-theme-ios myTheme1'}
        debug={false}
        newLineOnEnter={true}
        inputName={'default'}
        layout={layout}
        layoutName={'default'}
        physicalKeyboardHighlight={true}
      />

      <footer className="mt-4 flex w-full items-center justify-center text-white">
        <a
          className="flex items-center justify-center gap-2"
          href="dankat.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with 💖 by{' '}
          <p className='text-yellow-600'> katungi</p>
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://api.frontendexpert.io/api/fe/wordle-words')
  const words = await res.json()

  return {
    props: { words }
  }
}