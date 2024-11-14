import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../Product/Product.module.css';
import { Link } from 'react-router-dom';

const Product = () => {
  const [data, setData] = useState([]); 
  const [showCard, setShowCard] = useState(4)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://textmy-site-backend.onrender.com/user/products/'); 
        setData(response.data.result); 
      } catch (error) {
         console.error(error.message)
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://textmy-site-backend.onrender.com/user/products/${id}`);
      alert(response.data.message); // Show success message
      // Remove the deleted product from the state to update the UI
      setData(data.filter(product => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  const AddmoreCard = ()=>{
    setShowCard((prev) => Math.min(prev + 4, data.length));
  }
  const AddLessCard = ()=>{
       setShowCard((prve) => Math.max(prve -  4,4) )
  }


  

  return (
    <>
    
   <div className={style.card}>
    <div>
    <h1>Product Page</h1>
    </div>
     <div className={style.CardIteam}>
      {data.length > 0 ? (
        data.slice(0, showCard).map((product) => (
          <div key={product._id} className={style.mainContainer}>
            <div className={style.iteam2}>
              <img src={product.image[0]} alt={product.productname} width="50" height="50" />
            </div>
            <div className={style.iteam}>
              <h4>Product Name :</h4>
              <p>{product.productname}</p>
              </div>
            <div className={style.iteam}>
              <h4>Product price :</h4>
              <p>{product.price}</p>
              </div>
            <div className={style.iteam}>
               <h4>Product category :</h4>
              <p>{product.category}</p>
            </div>
            <div className={style.iteam}>
                <h4>Product inStock :</h4>
              <p>{product.inStock ? 'Yes' : 'No'}</p>
            </div>
            <div className={style.Starbutton}>
                <div >
                    <Link to={`/updateproduct/${product._id}`}><button>Update</button></Link>
                </div>
                <div>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
                </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
      
      </div>
      </div>
      <div className={style.showButton}>
              {showCard < data.length && (
                 <button onClick={AddmoreCard}>Show More</button>
              )}
              {showCard > 4 && (
                <button onClick={AddLessCard}>Show Less</button>
               )}
      </div>
    </>
  );
};

export default Product;

