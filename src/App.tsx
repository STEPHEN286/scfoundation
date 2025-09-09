import Header from "./components/Header"
import Footer from "./components/Footer"
import SinglePageApp from "./components/SinglePageApp"

function App(){
  return (
    <div>
      <Header />
      <main>
        <SinglePageApp />
      </main>
      <Footer />
    </div>
  )
}

export default App
