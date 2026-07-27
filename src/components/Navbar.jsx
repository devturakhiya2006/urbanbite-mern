 import React, { useState } from 'react'
  import { Link, useNavigate } from 'react-router-dom'
  import Badge from 'react-bootstrap/Badge'
  import Model from '../Model';
  import Cart from '../screens/Cart';
  import { useCart } from './ContexrReducer';

  export default function Navbar() {
    const data = useCart();
    const [cartView, setCartView] = useState(false)
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("authToken")
      navigate("/login")
    }

    return (
      <>
        <style>{`
          .ub-navbar {
            background: linear-gradient(90deg, #e0954a 0%, #f2a65a 100%);
            padding: 0.75rem 1rem;
            box-shadow: 0 3px 14px rgba(0, 0, 0, 0.18);
          }

          .ub-navbar .navbar-brand {
            color: #1a1a1a !important;
            font-size: 1.65rem;
            font-style: italic;
            font-weight: 800;
            letter-spacing: 1px;
          }

          .ub-navbar .navbar-brand span {
            color: #ffffff;
          }

          .ub-navbar .nav-link {
            color: rgba(26, 26, 26, 0.78) !important;
            font-size: 1rem;
            font-weight: 600;
            padding: 0.45rem 0.9rem !important;
            transition: color 0.2s ease;
          }

          .ub-navbar .nav-link:hover,
          .ub-navbar .nav-link.active {
            color: #ffffff !important;
          }

          .ub-navbar .navbar-toggler {
            border-color: rgba(26, 26, 26, 0.45);
          }

          .ub-navbar .navbar-toggler:focus {
            box-shadow: 0 0 0 0.18rem rgba(255, 255, 255, 0.35);
          }

          .ub-navbar .navbar-toggler-icon {
            filter: brightness(0.2);
          }

          .ub-nav-dark-btn {
            background: #1f2022 !important;
            color: #ffffff !important;
            border: 2px solid #1f2022 !important;
            border-radius: 50px !important;
            font-weight: 700 !important;
            transition: all 0.2s ease;
          }

          .ub-nav-dark-btn:hover {
            background: #ffffff !important;
            color: #1a1a1a !important;
            border-color: #ffffff !important;
          }

          .ub-nav-outline-btn {
            background: transparent !important;
            color: #1a1a1a !important;
            border: 2px solid #1a1a1a !important;
            border-radius: 50px !important;
            font-weight: 700 !important;
            transition: all 0.2s ease;
          }

          .ub-nav-outline-btn:hover {
            background: #1f2022 !important;
            color: #ffffff !important;
            border-color: #1f2022 !important;
          }

          .ub-cart-badge {
            background: #ffffff !important;
            color: #1a1a1a !important;
            font-size: 0.72rem;
          }

          @media (max-width: 991px) {
            .ub-navbar .navbar-nav {
              padding: 0.7rem 0;
            }

            .ub-navbar .navbar-actions {
              padding-top: 0.5rem;
            }
          }
        `}</style>

        <nav className="navbar navbar-expand-lg sticky-top ub-navbar">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              URBAN<span>BITE</span>
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto ms-lg-4">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">Home</Link>
                </li>

                {localStorage.getItem("authToken") && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/myorder">My Order</Link>
                  </li>
                )}
              </ul>

              {!localStorage.getItem("authToken") ? (
                <div className="d-flex gap-2 navbar-actions">
                  <Link className="btn ub-nav-dark-btn px-4" to="/login">
                    Login
                  </Link>

                  <Link className="btn ub-nav-outline-btn px-4" to="/createuser">
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-2 navbar-actions">
                  <button
                    type="button"
                    className="btn ub-nav-dark-btn px-3 d-flex align-items-center"
                    onClick={() => setCartView(true)}
                  >
                    My Cart&nbsp;
                    <Badge pill className="ub-cart-badge">{data.length}</Badge>
                  </button>

                  {cartView && (
                    <Model onClose={() => setCartView(false)}>
                      <Cart />
                    </Model>
                  )}

                  <button
                    type="button"
                    className="btn ub-nav-outline-btn px-3"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </>
    )
  }