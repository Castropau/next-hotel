"use client";
import Footer from '@/app/components/footer';
import Navbar from '@/app/components/login/navbar';
import React from 'react';
import Maps from './map';

export default function Map() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Maps />
      </div>
      <Footer />
    </div>
  );
}
