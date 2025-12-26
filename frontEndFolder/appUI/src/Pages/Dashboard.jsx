import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Track which user is being edited
  const [editUserId, setEditUserId] = useState(null);

  // Form state for editing
  const [editForm, setEditForm] = useState({
    name: "",
    email: ""
  });

  // Fetch users
  useEffect(() => {
    axiosInstance
      .get("/users")
      .then((res) => {
        setUsers(res.data.users || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Start editing
  const handleEdit = (user) => {
    setEditUserId(user._id);
    setEditForm({
      name: user.name,
      email: user.email
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditUserId(null);
    setEditForm({ name: "", email: "" });   
  };

  // Save updated user
  const handleUpdate = (id) => {
    axiosInstance
      .put(`/users/${id}`, editForm)
      .then((res) => {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? res.data.users : user
          )
        );
        setEditUserId(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Delete user
  const deleteUser = (id) => {
    axiosInstance
      .delete(`/users/${id}`)
      .then(() => {
        setUsers((prev) => prev.filter((user) => user._id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Filter users
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold">
          Total Employees: <span className="font-bold">{filteredUsers.length}</span>
        </h1>

        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 border rounded"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 rounded shadow-sm"
          >
            {/* NAME */}
            <div className="mb-3">
              <p className="text-sm text-gray-500">Name</p>

              {editUserId === user._id ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              ) : (
                <p className="font-medium">{user.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <p className="text-sm text-gray-500">Email</p>

              {editUserId === user._id ? (
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              ) : (
                <p className="truncate">{user.email}</p>
              )}
            </div>

            {/* ACTION BUTTONS */}
            {editUserId === user._id ? (
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleUpdate(user._id)}>
                  Save
                </Button>
                <Button size="sm" variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleEdit(user)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No employees found
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
