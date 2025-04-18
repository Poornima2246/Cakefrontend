import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import './Cakepro.css';

function Cakepro() {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching cakes...");
        const response = await axios.get("https://cakeserver-8es2.onrender.com/api/dessert/list");
        console.log("Response data:", response.data);
        if (Array.isArray(response.data.data)) {
          setCakes(response.data.data);
        } else {
          throw new Error("Invalid data format from API");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cakes:", err);
        setError("Failed to fetch cakes. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading cakes...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary font-fntprimary mt-5">
          Our Creations
        </h1>
        
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-min"
        >
          {cakes.map((item) => (
            <div
              key={item._id}
              className="product-card bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-10 overflow-hidden">
                <img
                  src={item.mainImage || "/placeholder-image.png"}
                  alt={item.name || "Cake"}
                  className="card-img hover:scale-110 transition-all duration-500"
                  loading="lazy"
                  onError={(e) => { e.target.src = "/placeholder-image.png"; }}
                />
              </div>
              
              <div className="p-6 flex-grow">
                <p className="text-xl font-serif italic text-pink-600 leading-relaxed">
                  {item.name || "Unnamed Cake"}
                </p>
              </div>
              
              <div className="px-6 pb-6">
                <button
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out transform"
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  ); 
}

export default Cakepro;