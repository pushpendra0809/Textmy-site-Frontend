import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../AllProductlist/AllProduct.module.css';

const Allproduct = () => {
  const [data, setData] = useState([]); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://textmy-site-backend.onrender.com/user/products/'); 
        setData(response.data.result); 
      } catch (error) {
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.iteam1}><h4>Product Name</h4></div>
        <div className={style.iteam}><h4>Price</h4></div>
        <div className={style.iteam}><h4>Category</h4></div>
        <div className={style.iteam}><h4>In Stock</h4></div>
        <div className={style.iteam2}><h4>Image</h4></div>
      </div>

      {error && <p className={style.error}>{error}</p>}

      {data.length > 0 ? (
        data.map((product) => (
          <div key={product._id} className={style.mainContainer}>
            <div className={style.iteam}><p>{product.productname}</p></div>
            <div className={style.iteam}><p>{product.price}</p></div>
            <div className={style.iteam}><p>{product.category}</p></div>
            <div className={style.iteam}><p>{product.inStock ? 'Yes' : 'No'}</p></div>
            <div className={style.iteam3}>
              <img src={product.image[0]} alt={product.productname} width="50" height="50" />
            </div>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </>
  );
};

export default Allproduct;

