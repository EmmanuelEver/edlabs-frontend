import '@/styles/globals.css'
import { ROLES } from '@/types/types'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const role:ROLES = "STUDENT"
  return <Component role={role} {...pageProps} />
}
