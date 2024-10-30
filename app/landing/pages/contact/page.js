import Footer from "@/app/components/footer";
import Navbar from "@/app/components/login/navbar";
import React from "react";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">contact</div>
      <Footer />
    </div>
  );
}
