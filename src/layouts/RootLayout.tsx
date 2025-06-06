
import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div>
     <Header />
      <main>
        <Outlet  />
      </main>
      <p>footer</p>
    </div>
  )
}
