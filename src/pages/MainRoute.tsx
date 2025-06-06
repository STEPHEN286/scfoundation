import RootLayout from "@/layouts/RootLayout"
import { createBrowserRouter } from "react-router-dom"
import HomePage from "./HomePage"


const routers = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
                {
                    index:true,
                    element: <HomePage />
                }
        ]

        
    }
])

export default routers