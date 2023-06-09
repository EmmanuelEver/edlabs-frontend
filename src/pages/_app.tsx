import SwrProvider from '@/context/providers/SwrProvider'
import AuthGuard from '@/guards/AuthGuard'
import '@/styles/globals.css'




export default function App({ Component, pageProps }: any) {
  return (
      <SwrProvider>
        {
          Component.isPrivate ?
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
          :
          <Component {...pageProps} />
        }
      </SwrProvider>
  )
}
