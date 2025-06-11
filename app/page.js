"use client";
import Navbar from "../components/Navbar.jsx";
import Header from "../components/Header.jsx";
import About from "../components/About.jsx";
import Services from "../components/Services.jsx";
import Portfolio from "../components/Portfolio.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

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
