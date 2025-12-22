import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-xl font-bold">My App</h1>

      <div className="space-x-2">
        <Link to="/register">
          <Button variant="outline">Register</Button>
        </Link>

        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </header>
  )
}

export default Header
