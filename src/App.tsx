import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import SinglePageApp from "./components/SinglePageApp"
import Gallery from "./pages/Gallery"
import ReactQueryProvider from "./components/ReactQueryProvider"

function App(){
  return (
    <ReactQueryProvider>  
 <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<SinglePageApp />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
      <Footer />
    </div>
    </ReactQueryProvider>
   
  )
}

export default App
