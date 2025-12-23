import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    // form destructuring
    const { name, email, password } = formData

    // handle input change
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const response = await axios.post(
                "http://localhost:5000/api/register",
                formData
            )

            alert(response.data.message)

            // clear form
            setFormData({
                name: "",
                email: "",
                password: "",
            })
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-center">Register</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={name}
                                onChange={onChange}
                                placeholder="Enter name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Enter email"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Enter password"
                            />
                        </div>

                        {/* Submit button */}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </Button>

                        <p className="text-sm text-gray-600 text-center space-x-2">
                            <span>Already have an account?</span>

                            <Link
                                to="/login"
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Log in
                            </Link>
                            {" |"}
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

export default Register
