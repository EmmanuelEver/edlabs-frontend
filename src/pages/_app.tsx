import AlertDialog from '@/components/alert/AlertDialog'
import ToastComponent from '@/components/toast/ToastComponent'
import AlertProvider from '@/context/providers/AlertProvider'
import SwrProvider from '@/context/providers/SwrProvider'
import ToastProvider from '@/context/providers/ToastProvider'
import AuthGuard from '@/guards/AuthGuard'
import '@/styles/globals.css'




export default function App({ Component, pageProps }: any) {
  return (
    <AlertProvider AlertComponent={AlertDialog}>
      <ToastProvider>
        <ToastComponent />
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
      </ToastProvider>
    </AlertProvider>
  )
}
