import '../styles/globals.css'
import 'react-simple-keyboard/build/css/index.css';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
