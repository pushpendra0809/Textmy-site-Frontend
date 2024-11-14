import React, { useState } from 'react';
import axios from 'axios';
import style from "../Add Product/Addproduct.module.css";

const Addproduct = () => {
  const [productname, setProductname] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [inStock, setInStock] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setInStock(checked);
    } else if (name === 'productname') {
      setProductname(value);
    } else if (name === 'price') {
      setPrice(value);
    } else if (name === 'category') {
      setCategory(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productname', productname);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('inStock', inStock);

    images.forEach((image) => {
      formData.append('image', image);
    });

    try {
      const response = await axios.post('http://localhost:8000/user/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.status === 'success') {
        alert('Product successfully created!');
      }
    } catch (error) {
      setError('An error occurred while creating the product');
    }
  };

  return (
      <div className={style.container}>
        <div className={style.mainheading}>
          <h2>New Product</h2>
        </div>
        <form className={style.mainCard} onSubmit={handleSubmit}>
          <div className={style.Allfield}>
            <div className={style.field}>
              <input type="file" id="image" name="image" multiple onChange={handleFileChange} />
            </div>
            <div className={style.field}>
              <input type="text" id="productname" name="productname" placeholder="Product Name" value={productname} onChange={handleChange} />
            </div>
            <div className={style.field}>
              <input type="text" id="price" name="price" placeholder="Price" value={price} onChange={handleChange} />
            </div>
            <div className={style.field}>
              <input type="text" id="category" name="category" placeholder="Category" value={category} onChange={handleChange} />
            </div>
            <div className={style.field}>
              <label>
                In Stock:
                <input  className={style.checked} type="checkbox" name="inStock" checked={inStock} onChange={handleChange} />
                </label>
            </div>
          </div>
          <div className={style.button}>
            <button type="submit" className={style.Submitfield}>Create Product</button>
          </div>
          {error && <p className={style.error}>{error}</p>}
        </form>
      </div>
  );
};

export default Addproduct;
