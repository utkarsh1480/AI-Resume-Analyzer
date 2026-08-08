import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
import Login from "./feature/auth/page/Login.jsx";
import Register from "./feature/auth/page/Register.jsx";
import Proteted from './feature/auth/components/Protectected.jsx'
import Home from './feature/Interview/pages/Home.jsx'
import Interview from "./feature/Interview/pages/Interview.jsx";

const router = createBrowserRouter([
    // {
    //     path : "/",
    //     Element : <Home />
    // },
    // {
    //     path : "/about",
    //     Element : <About />
    // },
    // {
    //     path : "/contact",
    //     Element : <Contact />
    // },
    {
        path : "/login",
        element : <Login />
    },
    {
        path : "/register",
        element : <Register />
    },
    {
        path : '/',
        element: <Proteted><Home/></Proteted>
    },
    {
        path : '/interview/:interviewId',
        element : <Proteted><Interview/></Proteted>
    }

])

export default function AppRoutes() {
    return (
        <RouterProvider router={router} />
    )
}