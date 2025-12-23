import { Link, useNavigate } from "react-router-dom"
import { logoutUser, isLoggedIn } from "@/utils/auth"

const Navbar = () => {
  const navigate = useNavigate()
  const loggedIn = isLoggedIn()

  const handleLogout = () => {
    logoutUser(navigate)
  }

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Brand */}
        <Link to="/" className="text-lg font-semibold text-gray-900">
          Employee Management Portal 
        </Link>

        {/* Right side */}
        {!loggedIn ? (
          <div className="flex items-center">
            
            {/* Register */}
            <Link
              to="/register"
              className="rounded-md bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
            >
              Register
            </Link>

            {/* Space */}
            <span className="w-3" />

            {/* Login */}
            <Link
              to="/login"
              className="rounded-md border px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              Login
            </Link>

          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  )
}

export default Navbar
