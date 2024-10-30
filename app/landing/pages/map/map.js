import React from 'react';

export default function Maps() {
  const hotelLocation = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194243.49205963983!2d121.02885363521873!3d14.575932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c84c96f104f1%3A0x14d6ece51b0e4711!2sGarv's%20Boutique%20Hotel!5e0!3m2!1sen!2sph!4v1631788805368!5m2!1sen!2sph";

  return (
    <div className="max-w-6xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-4">Garv&apos;s Boutique Hotel Location</h2>
      <p className="text-center text-lg mb-4">
        Find us at the heart of the city! Enjoy your stay and explore the best local attractions.
      </p>
      <iframe
        src={hotelLocation}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        className="rounded-lg shadow-md"
      ></iframe>
    </div>
  );
}
