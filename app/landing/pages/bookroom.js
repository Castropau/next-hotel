"use client";
import React, { useEffect, useState } from 'react';

export default function BookRoom() {
  const [rooms, setRooms] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numPersons, setNumPersons] = useState(1);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/rooms');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRoom(null);
    setCheckInDate('');
    setCheckOutDate('');
    setNumPersons(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate inputs
    if (!checkInDate || !checkOutDate || numPersons < 1) {
      alert('Please fill in all fields correctly.');
      return;
    }
  
    
    const userId = 15;
  
    // form
    const bookingData = {
      users_id: userId,
      room_id: selectedRoom.id,
      checkin: checkInDate,
      checkout: checkOutDate,
      number_of_persons: numPersons,
    };
  
    // Send booking request
    const response = await fetch('/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
  
    if (response.ok) {
      alert('Booking successful!');
      handleModalClose();
    } else {
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-8 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Top 5 Rooms - Most Rated</h1>
      <div className="grid grid-cols-1 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="border rounded-lg shadow-md bg-white flex">
            <div className="p-4 w-1/2">
              <h2 className="text-xl font-semibold mb-2">{room.name}</h2>
              <p className="mb-2">{room.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">${room.price} / night</span>
                <span className="text-sm text-gray-600">
                  Max: {room.maxGuests} guests | Min: {room.minGuests} guests
                </span>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleBookNow(room)}
                  className="bg-blue-500 text-white text-sm py-1 px-3 rounded-md hover:bg-blue-600"
                >
                  Book Now
                </button>
              </div>
            </div>
            <img src={room.image} alt={room.name} className="w-1/2 h-auto object-cover rounded-r-md" />
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Book {selectedRoom?.name}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Check-In Date</label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  required
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Check-Out Date</label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  required
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Number of Persons</label>
                <input
                  type="number"
                  value={numPersons}
                  onChange={(e) => setNumPersons(e.target.value)}
                  min="1"
                  required
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600">
                  Confirm Booking
                </button>
                <button type="button" onClick={handleModalClose} className="ml-2 text-gray-600">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
