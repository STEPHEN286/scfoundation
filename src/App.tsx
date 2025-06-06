import { RouterProvider } from "react-router-dom"
import routers from "./pages/MainRoute"

function App(){
  return (
    <RouterProvider router={routers} />
  )
}

export default App
