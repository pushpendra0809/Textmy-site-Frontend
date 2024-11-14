import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import style from "../UpdateProduct/UpdateProduct.module.css"

const UpdateProduct = () => {
  const { id: productId } = useParams();
  const  usenavigate = useNavigate()
  const [product, setProduct] = useState({
    productname: '',
    price: '',
    category: '',
    inStock: false,
    image: []
  });
  const [selectedFiles, setSelectedFiles] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/products/${productId}`);
        const fetchedProduct = response.data.result;
        setProduct({
          productname: fetchedProduct.productname,
          price: fetchedProduct.price,
          category: fetchedProduct.category,
          inStock: fetchedProduct.inStock,
          image: fetchedProduct.image
        });
      } catch (error) {
        console.error("Failed to fetch product details:", error.message);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productname', product.productname);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('inStock', product.inStock);
  
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => formData.append('image', file));
    }
  
    try {
      const response = await axios.put(`http://localhost:8000/user/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data.message);
      usenavigate("/product")
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  return (
    <div className={style.container}>
        <div>
        <h1>Update Product</h1>
        </div>
    <form  className={style.mainCard} onSubmit={handleSubmit}>
      <label>Product Name:</label>
      <input type="text" name="productname" value={product.productname} onChange={handleChange} />

      <label>Price:</label>
      <input type="number" name="price" value={product.price} onChange={handleChange} />

      <label>Category:</label>
      <input type="text" name="category" value={product.category} onChange={handleChange} />

      <label>In Stock:</label>
      <input type="Boolean" name="inStock" value={product.inStock} onChange={handleChange} />

      <label>Image:</label>
      <input type="file" multiple onChange={handleFileChange} />

      <div>
         <button type="submit">Update Product</button>
      </div>
    </form>
    </div>
  );
};

export default UpdateProduct;
