 


import React, { useState } from "react";
import axios from "axios";

function Addpage() {
  const url = "https://cakeserver-8es2.onrender.com";
  const [formData, setFormData] = useState({
    mainImage: null,
    addImage1: null,
    addImage2: null,
    name: "",
    description: "",
    category: "Cake",
    price: "",
  });

  // Handle changes for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0], // Store only the first file for now
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.mainImage) {
      alert("Please upload the main image.");
      return;
    }
  
    if (!formData.name || !formData.description || !formData.price) {
      alert("Please fill in all the fields.");
      return;
    }
  
    const data = new FormData();
    data.append("mainImage", formData.mainImage);
    if (formData.addImage1) data.append("addImage1", formData.addImage1);
    if (formData.addImage2) data.append("addImage2", formData.addImage2);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
  
    try {
      const response = await axios.post(`${url}/api/dessert/add`, data);
      if (response.data.success) {
        alert("Cake added successfully!");
        setFormData({
          mainImage: null,
          addImage1: null,
          addImage2: null,
          name: "",
          description: "",
          category: "Cake",
          price: "",
        });
      } else {
        alert(response.data.message || "Error adding cake");
      }
    } catch (error) {
      console.error("Error adding cake:", error);
      alert("An error occurred while adding the cake. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-200">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 w-full max-w-md p-6 bg-white rounded-lg shadow-lg mt-16"
      >
        {/* Main Image Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="mainImage">Main Product Image</label>
          <input
            type="file"
            id="mainImage"
            name="mainImage"
            onChange={handleFileChange}
            className="p-2 border rounded-md"
            required // Ensure main image is required
          />
        </div>

        {/* Additional Images Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="addImage1">Additional Image 1</label>
          <input
            type="file"
            id="addImage1"
            name="addImage1"
            onChange={handleFileChange}
            className="p-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="addImage2">Additional Image 2</label>
          <input
            type="file"
            id="addImage2"
            name="addImage2"
            onChange={handleFileChange}
            className="p-2 border rounded-md"
          />
        </div>

        {/* Product Name Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />
        </div>

        {/* Product Description Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Product Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border rounded-md"
            rows="4"
            required
          />
        </div>

        {/* Product Category Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="category">Product Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-2 border rounded-md"
          >
            <option value="Cake">Cake</option>
            <option value="Cupcake">Cupcake</option>
            <option value="Donut">Donut</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Product Price Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="$20"
            className="p-2 border rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 p-2 rounded-lg bg-blue-400 text-white"
        >
          Add Upload
        </button>
      </form>
    </div>
  );
}

export default Addpage;



// import React, { useState } from "react";
// import axios from "axios";

// function AddPage() {
//   const url = "https://cakes-backend-q803.onrender.com";
//   const [formData, setFormData] = useState({
//     mainImage: null,
//     addImage1: null,
//     addImage2: null,
//     name: "",
//     description: "",
//     category: "Cake",
//     price: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: files[0],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("mainImage", formData.mainImage);
//     if (formData.addImage1) data.append("addImage1", formData.addImage1);
//     if (formData.addImage2) data.append("addImage2", formData.addImage2);
//     data.append("name", formData.name);
//     data.append("description", formData.description);
//     data.append("category", formData.category);
//     data.append("price", formData.price);

//     try {
//       const response = await axios.post(`${url}/api/dessert/add`, data);
//       if (response.data.success) {
//         alert("Cake added successfully!");
//         setFormData({
//           mainImage: null,
//           addImage1: null,
//           addImage2: null,
//           name: "",
//           description: "",
//           category: "Cake",
//           price: "",
//         });
//       } else {
//         alert(response.data.message || "Error adding cake.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while uploading. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-pink-200">
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-8 w-full max-w-md p-6 bg-white rounded-lg shadow-lg mt-16"
//       >
//         <input type="file" name="mainImage" onChange={handleFileChange} required />
//         <input type="file" name="addImage1" onChange={handleFileChange} />
//         <input type="file" name="addImage2" onChange={handleFileChange} />
//         <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//         <textarea name="description" value={formData.description} onChange={handleChange} required />
//         <select name="category" value={formData.category} onChange={handleChange}>
//           <option value="Cake">Cake</option>
//           <option value="Cupcake">Cupcake</option>
//         </select>
//         <input type="number" name="price" value={formData.price} onChange={handleChange} required />
//         <button type="submit">Add Upload</button>
//       </form>
//     </div>
//   );
// }

// export default AddPage;
