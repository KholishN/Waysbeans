// import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
// import { UserContext } from "../../context/UserContext.js"
export default function PrivateRoute() {
  console.log(Outlet)
    const role = "admin"
  return (
    role ? <Outlet /> : <Navigate to="/" />
  )
}
