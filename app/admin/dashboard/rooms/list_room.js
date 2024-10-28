"use client";
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function RoomList() {
  const initialRooms = [
    { id: 1, name: 'Room 101', type: 'Single', price: 100 },
    { id: 2, name: 'Room 102', type: 'Double', price: 150 },
    { id: 3, name: 'Room 103', type: 'Suite', price: 200 },
    { id: 4, name: 'Room 104', type: 'Single', price: 120 },
    { id: 5, name: 'Room 105', type: 'Double', price: 180 },
    { id: 6, name: 'Room 106', type: 'Suite', price: 220 },
  ];

  const [rooms, setRooms] = useState(initialRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({ type: '', persons: '', price: '', photo: '' });

  // const normalizeString = (str) => str.replace(/\s+/g, '').toLowerCase();
  const normalizeString = (str) => (str || '').replace(/\s+/g, '').toLowerCase(); // Default to empty string if undefined
  const filteredRooms = rooms.filter(room =>
    normalizeString(room.name).includes(normalizeString(searchTerm))
  );

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const handleEdit = (id) => {
    console.log(`Edit room with ID: ${id}`);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    setRooms(rooms.filter(room => room.id !== id));
  };

  const handleAddRoom = async () => {
    try {
      const newRoomData = {
        room: newRoom.type, // Ensure this matches your database column
        persons: newRoom.persons,
        price: newRoom.price,
        image: newRoom.photo,
      };
  
      const response = await fetch('/admin/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRoomData), // Use newRoomData directly
      });
  
      const data = await response.json();
  
      if (data.success) {
        setRooms([...rooms, newRoomData]); // Add new room to the list
        setNewRoom({ type: '', persons: '', price: '', photo: '' });
        setIsModalOpen(false);
        Swal.fire({
          title: 'Success!',
          text: 'Room added successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Failed to add room.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error adding room:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">List of Rooms</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search rooms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md p-2 w-1/4"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Room
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="py-2 px-4 border-b text-left">Room Name</th>
            <th className="py-2 px-4 border-b text-left">Room Type</th>
            <th className="py-2 px-4 border-b text-right">Price</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRooms.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-500">
                No results found.
              </td>
            </tr>
          ) : (
            currentRooms.map((room) => (
              <tr key={room.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{room.name}</td>
                <td className="py-2 px-4 border-b">{room.type}</td>
                <td className="py-2 px-4 border-b text-right">${room.price}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleEdit(room.id)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
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
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-2xl">
            <h2 className="text-lg font-bold mb-4">Add New Room</h2>
            <div className="max-h-[60vh] overflow-y-auto">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Room Type</label>
                <input
                  type="text"
                  value={newRoom.type}
                  onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Persons</label>
                <input
                  type="number"
                  value={newRoom.persons}
                  onChange={(e) => setNewRoom({ ...newRoom, persons: e.target.value })}
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  value={newRoom.price}
                  onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setNewRoom({ ...newRoom, photo: imageUrl });
                    }
                  }}
                  className="border rounded-md p-2 w-full"
                />
              </div>
              {newRoom.photo && (
                <div className="mb-4">
                  <img
                    src={newRoom.photo}
                    alt="Room Preview"
                    className="mt-2 w-full h-auto rounded"
                    style={{ maxHeight: '300px', objectFit: 'contain' }} // Limit height while preserving aspect ratio
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRoom}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
