import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let timeoutId;

    const fetchProduct = async () => {
      try {
        console.log(`Fetching product with ID: ${id}`);
        const response = await axios.get(`https://cakeserver-8es2.onrender.com/api/dessert/${id}`, {
          signal: controller.signal,
        });
        console.log("Response data:", response.data);

        if (response.data && typeof response.data === "object") {
          setProduct(response.data);
          setMainImage(response.data.mainImage || "");
        } else {
          throw new Error("Product not found.");
        }
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request canceled:", err.message);
          return;
        }
        console.error("Error fetching product:", err, err.name, err.message);
        setError(
          err.response?.status === 404
            ? "Product not found. It may have been removed."
            : err.message === "Network Error"
            ? "Network error. Please check your connection."
            : "An unexpected error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    // Debounce the fetch to avoid rapid cancellations
    timeoutId = setTimeout(fetchProduct, 100);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p className="text-red-500">Product not found.</p>;

  const additionalImages = [product.mainImage, product.addImage1, product.addImage2].filter(Boolean);
  const maxDescriptionLength = 100;
  const truncatedDescription =
    product.description.length > maxDescriptionLength
      ? product.description.slice(0, maxDescriptionLength) + "..."
      : product.description;

  return (
    <div className="product-details container mx-auto p-4 mt-16">
      <div className="flex flex-col-reverse md:flex-row gap-6">
        <div className="flex-1">
          <motion.img
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            src={mainImage || "/placeholder-image.png"}
            alt={product.name || "Product"}
            className="order-1 md:order-2 w-full h-full lg:w-8/12 lg:h-8/12 mx-auto object-cover rounded-xl shadow-md"
            onError={(e) => (e.target.src = "/placeholder-image.png")}
          />
        </div>
        <div className="flex-1 text-center pt-5 md:pt-24 order-2 md:order-1">
          <h1 className="text-xl text-pink-500 break-words">{product.name || "Unnamed Product"}</h1>
          <p className="text-lg text-gray-700 mb-4">
            {showFullDescription || window.innerWidth >= 768
              ? product.description || "No description available."
              : truncatedDescription}
            {product.description.length > maxDescriptionLength && window.innerWidth < 768 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-pink-500 hover:text-pink-600 ml-2 focus:outline-none"
              >
                {showFullDescription ? "Show Less" : "Show More"}
              </button>
            )}
          </p>
          <p className="text-xl font-semibold mb-4">
            Price: ${product.price ? product.price.toFixed(2) : "N/A"}
          </p>
          <p className="text-md text-gray-600 mb-2">Category: {product.category || "Uncategorized"}</p>
          <Link to="/Menu">
            <button className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors">
              Back to Menu
            </button>
          </Link>
        </div>
      </div>
      {additionalImages.length > 0 && (
        <div className="flex mt-8 max-w-3xl order-2 sm:order-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:ml-10 gap-2">
            {additionalImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="cursor-pointer"
                onClick={() => setMainImage(image)}
              >
                <img
                  src={image || "/placeholder-image.png"}
                  alt={`Additional ${index + 1}`}
                  className="w-full h-full md:h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  onError={(e) => (e.target.src = "/placeholder-image.png")}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;