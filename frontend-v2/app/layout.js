import './globals.css'
import Providers from '@/components/Providers'

export const metadata = {
  title: 'GCBC',
  description: 'Grace Covenant Baptist Church, Birmingham Alabama',
  keywords: 'grace, covenant, baptist, church, Birmingham, Alabama',
  metadataBase: new URL('https://gracecovenantbaptist.org'),
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}