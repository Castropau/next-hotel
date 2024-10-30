"use client";
import Footer from '@/app/components/footer';
import Navbar from '@/app/components/login/navbar';
import React from 'react'
import BookRoom from '../bookroom';

export default function Book() {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
        <BookRoom/>
        </div>
        <Footer />
    </div>
  )
}
