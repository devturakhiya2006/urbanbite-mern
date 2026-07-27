import React from 'react'
import Home from './screens/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import SignUp from './screens/SignUp.jsx';
import { CartProvider } from './components/ContexrReducer.jsx';
import Cart from './screens/Cart.jsx';
import MyOrder from './screens/MyOrder.jsx';

const App = () => {
  return (
    <CartProvider>
    <Router>
      <div >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/createuser" element={<SignUp/>} />
          <Route exact path="/myorder" element={<MyOrder/>} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  )
}

export default App
