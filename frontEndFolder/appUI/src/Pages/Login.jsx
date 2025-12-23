import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { useEffect } from "react"
import { isLoggedIn } from "@/utils/auth"


import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Login = () => {
  // form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // destructuring
  const { email, password } = formData

  const navigate = useNavigate()

  // input change handler
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  //useEffect 
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/")
    }
  }, [])


  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData
      )

      // store token
      localStorage.setItem("token", response.data.token)

      // redirect
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Enter email"
              />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter password"
              />
            </div>

            {/* Error message */}
            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            {/* Submit button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            {/* Links */}
            <p className="text-sm text-gray-600 text-center space-x-2">
              <span>Don’t have an account?</span>

              <Link
                to="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Register
              </Link>

              {" | "}

              <Link
                to="/"
                className="text-blue-600 font-medium hover:underline"
              >
                Home
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
