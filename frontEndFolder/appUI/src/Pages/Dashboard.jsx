import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/utils/axiosInstance"

const Dashboard = () => {
  // State to store all employees
  const [users, setUsers] = useState([])

  // State to store search input value
  const [search, setSearch] = useState("")

  // Fetch employees when page loads
  useEffect(() => {
    axiosInstance
      .get("/users")
      .then((res) => {
        setUsers(res.data.users)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // Delete employee by id
  const deleteUser = (id) => {
    axiosInstance
      .delete(`/users/${id}`)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== id)
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Total Employees */}
      <div className="mb-4">
        <p className="text-lg">
          Total Employees: <b>{filteredUsers.length}</b>
        </p>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full max-w-sm px-3 py-2 border rounded"
      />

      {/* Employee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 rounded shadow"
          >
            <p className="font-semibold">Name</p>
            <p className="mb-2">{user.name}</p>

            <p className="font-semibold">Email</p>
            <p className="mb-4">{user.email}</p>

            <Button
              variant="destructive"
              onClick={() => deleteUser(user._id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Dashboard
