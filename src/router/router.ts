import { createBrowserRouter } from "react-router"
import App from "../App"
import Add from "../view/Add/Add"

const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
    },
    {
        path: '/add',
        Component: Add
    },
])

export default router