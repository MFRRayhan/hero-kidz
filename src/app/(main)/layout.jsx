import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import React from "react";

export default function MainLayout({ children }) {
  return (
    <>
      <header className="py-2 md:w-11/12 mx-auto">
        <Navbar></Navbar>
      </header>

      <main className="py-2 md:w-11/12 mx-auto min-h-[calc(100vh-305px)]">
        {children}
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
}
