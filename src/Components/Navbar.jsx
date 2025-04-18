 

import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import cake from "../Asset/c1.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" ,  block: "start" });
    }
  };
const handelHome=(e)=>{
  e.preventDefault();
  setMenuOpen(false);
  navigate("/");
  setTimeout(() => {
    scrollToSection("Home")
  }, 10);
}
  const handleAboutClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate("/");
    setTimeout(() => scrollToSection("about"), 0);
  };

 const handleContactClick = (e) =>{
  e.preventDefault();
  setMenuOpen(false);
  navigate("/")
  setTimeout(() => {
    scrollToSection("contact")
  }, 0);
 }

  return (
    <nav className="bg-white py-4 shadow-sm fixed w-full top-0 z-50">
      <div className="container justify-around mx-auto flex items-center">
        {/* Logo Section */}
        <Link to="/" className="flex gap-3">
          <img src={cake} alt="" className="h-8 w-8" />
          <span className="text-2xl font-fntprimary">Cake'es</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-fntprimary text-xl">
          <Link to="/" 
          onClick={handelHome}
          className="hover:text-pink-500 transition-colors">
            Home
          </Link>
          <Link to="/Menu" className="hover:text-pink-500 transition-colors">
            Menu
          </Link>
          <Link
            to="/"
            onClick={handleAboutClick}
            className="hover:text-pink-500 transition-colors"
          >
            About
          </Link>
          <Link
            to="/"
            onClick={handleContactClick}
            className="hover:text-pink-500 transition-colors"
          >
            Contact
          </Link>
          <Link to="/Login" className="hover:text-pink-500 transition-colors">
             Admin
          </Link>
        </div>

        {/* Icons */}
        <div className="flex justify-end items-end gap-2">
          <button className="p-2 hover:bg-pink-50 rounded-full transition-colors">
            <ShoppingBag className="h-5 w-5 text-gray-600 hover:text-pink-500" />
          </button>
          <button className="p-2 hover:bg-pink-50 rounded-full transition-colors">
            <Search className="h-5 w-5 text-gray-600 hover:text-pink-500" />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-full transition-colors"
          >
            {menuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white w-full py-4 shadow-md justify-center">
          <div className="flex flex-col items-center gap-4 font-fntprimary text-xl">

          <Link
              to="/"
              onClick={handelHome}
              className="hover:text-pink-500 transition-colors"
            >
               Home
            </Link>
            <Link
              to="/"
              onClick={handleAboutClick}
              className="hover:text-pink-500 transition-colors"
            >
              About
            </Link>
            <Link
              to="/Menu"
              onClick={() => setMenuOpen(false)}
              className="hover:text-pink-500 transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/"
              onClick={handleContactClick}
              className="hover:text-pink-500 transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/Login"
              onClick={() => setMenuOpen(false)}
              className="hover:text-pink-500 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}