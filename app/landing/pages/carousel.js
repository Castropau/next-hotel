"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const BookingModal = ({ isOpen, onClose, room }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">{room.name}</h2>
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p className="text-lg text-gray-700 mb-4">
          <strong>Price:</strong> ${room.price} per night
        </p>
        <p className="text-gray-600 mb-4">{room.description}</p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            onClick={() => {
              // Implement booking logic here
              console.log(`Booked room with ID: ${room.id}`);
              onClose(); // Close the modal after booking
            }}
          >
            Confirm Booking
          </button>
          <button
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/rooms');
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % rooms.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(intervalId);
  }, [rooms.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % rooms.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + rooms.length) % rooms.length);
  };

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {rooms.length > 0 ? (
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {rooms.map((room, index) => (
            <div key={index} className="flex-none w-full relative">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 p-4">
                <h2 className="text-3xl text-white font-bold mb-2 text-center">{room.name}</h2>
                <p className="text-lg text-white mb-4 text-center">{room.description}</p>
                <button
                  className="mt-2 bg-yellow-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
                  onClick={() => handleBookNow(room)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">Loading rooms...</p>
      )}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-200"
        onClick={prevSlide}
      >
        &lt;
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-200"
        onClick={nextSlide}
      >
        &gt;
      </button>
      <div className="flex justify-center mt-2">
        {rooms.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${currentIndex === index ? 'bg-yellow-500' : 'bg-gray-300'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Modal for booking */}
      <BookingModal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        room={selectedRoom || {}} 
      />
    </div>
  );
}
