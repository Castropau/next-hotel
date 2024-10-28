"use client";
import React from 'react';

const rooms = [
  {
    name: "Deluxe Suite",
    description: "Enjoy a luxurious stay in our Deluxe Suite, featuring modern amenities and stunning views.",
    image: "https://via.placeholder.com/800x400?text=Deluxe+Suite",
    price: 250,
    minGuests: 1,
    maxGuests: 4,
  },
  {
    name: "Standard Room",
    description: "A comfortable standard room with all essential amenities for a pleasant stay.",
    image: "https://via.placeholder.com/800x400?text=Standard+Room",
    price: 150,
    minGuests: 1,
    maxGuests: 2,
  },
  {
    name: "Family Room",
    description: "Spacious family room suitable for up to 5 guests, perfect for family getaways.",
    image: "https://via.placeholder.com/800x400?text=Family+Room",
    price: 300,
    minGuests: 2,
    maxGuests: 5,
  },
  {
    name: "Presidential Suite",
    description: "Experience luxury in our Presidential Suite with exclusive services and breathtaking views.",
    image: "https://via.placeholder.com/800x400?text=Presidential+Suite",
    price: 500,
    minGuests: 1,
    maxGuests: 3,
  },
  {
    name: "Budget Room",
    description: "An affordable room option for budget travelers, with all basic amenities included.",
    image: "https://via.placeholder.com/800x400?text=Budget+Room",
    price: 100,
    minGuests: 1,
    maxGuests: 2,
  },
];

export default function BookRoom() {
  return (
    <div className="max-w-6xl mx-auto my-8 p-6">
    <h1 className="text-2xl font-bold text-center mb-6">Top 5 Rooms - Most Rated</h1>
    <div className="grid grid-cols-1 gap-6">
      {rooms.map((room, index) => (
        <div key={index} className="border rounded-lg shadow-md bg-white flex">
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
              <button className="bg-blue-500 text-white text-sm py-1 px-3 rounded-md hover:bg-blue-600">
                Book Now
              </button>
            </div>
          </div>
          <img src={room.image} alt={room.name} className="w-1/2 h-auto object-cover rounded-r-md" />
        </div>
      ))}
    </div>
  </div>
);
}
