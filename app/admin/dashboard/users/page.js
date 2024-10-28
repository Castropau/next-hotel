"use client";
import React, { useEffect, useState } from 'react';
import Navbars from '../../components/navbar';
import FooterAdmin from '../../components/footer';
import Swal from 'sweetalert2';

export default function Bookings() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [newUser, setNewUser] = useState({ username: '', email: '' });
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('../../admin/api/users');
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // const filteredUsers = users.filter(user =>
  //   user.username.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const normalizeString = (str) => str.replace(/\s+/g, '').toLowerCase();

  const filteredUsers = users.filter(user =>
    normalizeString(user.username).includes(normalizeString(searchTerm)) ||
    normalizeString(user.email).includes(normalizeString(searchTerm))
  );
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleEdit = (id) => {
    console.log(`Edit user with ID: ${id}`);
    // Implement your edit logic here
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };
  const handleAddUser = async () => {
    try {
      // const response = await fetch('/api/register', {
        const response = await fetch('/admin/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Add the new user directly to the users state
        setUsers((prevUsers) => [
          ...prevUsers,
          { id: data.id, username: newUser.username, email: newUser.email }, // assuming data.id is the new user's ID
        ]);
        setNewUser({ username: '', email: '', password: '' });
        setIsModalOpen(false);
        Swal.fire({
          title: 'Success!',
          text: 'User added successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Failed to add user.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error adding user:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  
  

  return (
    <div className="flex flex-col min-h-screen">
      <Navbars />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md p-2 mb-4 w-1/4"
        />
        <button
            onClick={() => setIsModalOpen(true)}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add User
          </button>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 border-b">User Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-500">
                  No results found.
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{user.username}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md">
            <h2 className="text-lg font-bold mb-4">Add New User</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">User Name</label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterAdmin />
    </div>
  );
}
