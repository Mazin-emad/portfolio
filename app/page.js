"use client";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import About from "../components/About";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <About />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
    </>
  );
}
