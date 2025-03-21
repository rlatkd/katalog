import '../global.css'
import Footer from './components/client/layouts/footer'
import { Header } from './components/client/layouts/header'
import { Top } from './components/top'

type LayoutProps = {
  children: React.ReactNode,
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Top />
      <div>
        {children}
      </div>
      <Footer />
    </>
  )
}
