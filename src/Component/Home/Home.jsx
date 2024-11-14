import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../Home/Home.module.css';

const Home = () => {
  const [data, setData] = useState([]); 
  const [showCard, setShowCard] = useState(4)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/products/'); 
        setData(response.data.result); 
      } catch (error) {
         console.error(error.message)
      }
    };

    fetchData();
  }, []);



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

export default Home;

