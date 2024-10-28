"use client";
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Navbars from '../components/navbar';
import FooterAdmin from '../components/footer';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const username = Cookies.get('username');

    if (!username) {
      router.replace('/admin/');
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbars />
      <main className="flex-grow">
        {/* Add your dashboard content here */}
      </main>
      <FooterAdmin />
    </div>
  );
}
