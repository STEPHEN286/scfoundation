import RootLayout from "@/layouts/RootLayout"
import { createBrowserRouter } from "react-router-dom"
import HomePage from "./HomePage"
import AboutPage from "./About"
import ContactPage from "./Contact"


const routers = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
                {
                    index:true,
                    element: <HomePage />
                },
                {
                    path: "about",
                    element: <AboutPage />
                },
                {
                    path: "contact",
                    element: <ContactPage/>
                }
        ]

        
    }
])

export default routers