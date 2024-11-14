import './App.css';
import Addproduct from './Component/Add Product/Addproduct.jsx';
import Allproduct from './Component/AllProductlist/Allproduct.jsx';
import Home from './Component/Home/Home.jsx';
import Product from './Component/Product/Product.jsx';
import Navbar from "./Component/Navbar/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login/Login.jsx';
import Registration from './Component/Registration/Registration.jsx';
import UpdateProduct from './Component/UpdateProduct/UpdateProduct.jsx';
import ProtectedRoute from './Component/ProtectedPage/ProtectiveRoute.jsx'; 

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/Allproduct' element={<ProtectedRoute element={<Allproduct />} />} />
          <Route exact path='/addproduct' element={<ProtectedRoute element={<Addproduct />} />} />
          <Route exact path='/product' element={<ProtectedRoute element={<Product />}/>} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/registration' element={<Registration />} />
          <Route exact path='/updateproduct/:id' element={<ProtectedRoute element={<UpdateProduct />} />} />
          <Route exact path='/' element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
