import React from 'react'
import style from "../Navbar/Navbar.module.css"
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const isAuthenticated = localStorage.getItem('token'); 
    const navigate = useNavigate();

    const handelLogout = ()=>{
        localStorage.removeItem("token");
        navigate("/home")
    }

  return (
    <>
      <div className={style.mainContainer}>
            <div className={style.iteam1}>
                <img src="" alt="" />
                <h3>MyTextSide</h3>
            </div>
            <div className={style.iteam2}> 
                <li className={style.list}>
                    <Link to="/home">Home</Link>
                </li>
                <li className={style.list}>
                    <Link to="/product">Product</Link>
                </li>
                <li className={style.list}>
                    <Link to="/allproduct ">All Product List</Link>
                </li>
                <li className={style.list}>
                    <Link to="/addproduct">Add Product</Link>
                </li>
            </div>
            <div className={style.iteam3}>
               {isAuthenticated ? 
                ( <button className={style.button} onClick={handelLogout}>Logout</button> ):
                ( <Link to="/login"><button className={style.button}>Login</button></Link> )
              }

                <Link to="/registration"><button className={style.button}>Singin</button></Link>
            </div>
      </div>
    </>
  )
}

export default Navbar
