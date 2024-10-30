"use client";
import Footer from '@/app/components/footer'
import Navbar from '@/app/components/login/navbar'
import React from 'react'
import Maps from '../map/map';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex-grow">
   about
   </div>
    <Footer />
    </div>
  )
}
