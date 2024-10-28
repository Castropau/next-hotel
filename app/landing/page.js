"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Navbar from '../components/login/navbar';
import Carousel from './pages/carousel';
import BookRoom from './pages/bookroom';
import Footer from '../components/footer';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const storedUsername = Cookies.get('username');
    if (!storedUsername) {
      router.push('/components/login'); // Redirect to login if not authenticated
    }
  }, [router]);

  return (
    <div>
      <Navbar />
      <Carousel />
      <BookRoom />
      <Footer />
      
    </div>
  );
}
