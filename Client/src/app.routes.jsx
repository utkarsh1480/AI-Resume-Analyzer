import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./feature/auth/page/Login.jsx";
import Register from "./feature/auth/page/Register.jsx";
import Proteted from './feature/auth/components/Protectected.jsx'
import Home from './feature/Interview/pages/Home.jsx'
import Interview from "./feature/Interview/pages/Interview.jsx";
import LandingPage from "./feature/landing/LandingPage.jsx";

const router = createBrowserRouter([
    {
        path : "/",
        element : <LandingPage />
    },
    {
        path : "/login",
        element : <Login />
    },
    {
        path : "/register",
        element : <Register />
    },
    {
        path : '/dashboard',
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