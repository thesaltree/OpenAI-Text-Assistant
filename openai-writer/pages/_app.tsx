import { AppProps } from 'next/app'
import '../style.css'

export default function myApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
