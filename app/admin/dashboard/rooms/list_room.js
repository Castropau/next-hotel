"use client";
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({ id: null, type: '', persons: '', price: '', photo: null });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch('/admin/api/rooms/room_fetch');
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const normalizeString = (str) => (str || '').replace(/\s+/g, '').toLowerCase();
  const filteredRooms = rooms.filter(room =>
    normalizeString(room.room).includes(normalizeString(searchTerm))
  );

  const handleDeleteRoom = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/admin/api/rooms/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          fetchRooms();
          Swal.fire('Deleted!', 'Your room has been deleted.', 'success');
        } else {
          Swal.fire('Error!', data.message || 'Failed to delete room.', 'error');
        }
      } catch (error) {
        console.error('Error deleting room:', error);
        Swal.fire('Error!', 'An unexpected error occurred. Please try again later.', 'error');
      }
    }
  };

  const handleEditRoom = (room) => {
    setNewRoom(room);
    setIsModalOpen(true);
  };

  const handleAddOrUpdateRoom = async () => {
    try {
      const formData = new FormData();
      formData.append('room', newRoom.room);
      formData.append('persons', newRoom.persons);
      formData.append('price', newRoom.price);
      if (newRoom.photo) {
        formData.append('image', newRoom.photo);
      }

      const method = newRoom.id ? 'PUT' : 'POST';
      const url = newRoom.id ? `/admin/api/rooms/${newRoom.id}` : '/admin/api/rooms';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        await fetchRooms();
        setNewRoom({ id: null, type: '', persons: '', price: '', photo: null });
        setIsModalOpen(false);
        Swal.fire({
          title: 'Success!',
          text: `Room ${newRoom.id ? 'updated' : 'added'} successfully.`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message || `Failed to ${newRoom.id ? 'update' : 'add'} room.`,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error adding/updating room:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

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
        <button onClick={() => { setNewRoom({ id: null, type: '', persons: '', price: '', photo: null }); setIsModalOpen(true); }} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Room
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="py-2 px-4 border-b text-left">Room Name</th>
            <th className="py-2 px-4 border-b text-right">Price</th>
            <th className="py-2 px-4 border-b text-center">Image</th>
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
                <td className="py-2 px-4 border-b text-left">{room.room}</td>
                <td className="py-2 px-4 border-b text-right">${room.price}</td>
                <td className="py-2 px-4 border-b text-center">
                  {room.image && (
                    <img
                      src={room.image}
                      alt={`${room.room} preview`}
                      className="w-16 h-16 object-cover rounded mx-auto"
                    />
                  )}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button onClick={() => handleEditRoom(room)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2">Edit</button>
                  <button onClick={() => handleDeleteRoom(room.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">{newRoom.id ? 'Edit Room' : 'Add New Room'}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Room Name</label>
              <input
                type="text"
                value={newRoom.room}
                onChange={(e) => setNewRoom({ ...newRoom, room: e.target.value })}
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
                    setNewRoom({ ...newRoom, photo: file });
                  }
                }}
                className="border rounded-md p-2 w-full"
              />
            </div>
            {newRoom.photo && (
              <div className="mb-4">
                <img
                  src={URL.createObjectURL(newRoom.photo)}
                  alt="Room Preview"
                  className="mt-2 w-full h-auto rounded"
                  style={{ maxHeight: '300px', objectFit: 'contain' }}
                />
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button onClick={() => setIsModalOpen(false)} className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
              <button onClick={handleAddOrUpdateRoom} className="bg-blue-500 text-white px-4 py-2 rounded">
                {newRoom.id ? 'Update Room' : 'Add Room'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
