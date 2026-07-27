import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <style>{`
        .ub-footer {
          background: linear-gradient(90deg, #e0954a 0%, #f2a65a 100%);
          color: #ffffff;
          padding: 2.5rem 1.5rem 1.5rem;
          margin-top: 3rem;
        }
        .ub-footer h5 {
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-bottom: 1rem;
        }
        .ub-footer-link {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          display: block;
          margin-bottom: 0.5rem;
          transition: color 0.2s ease, padding-left 0.2s ease;
        }
        .ub-footer-link:hover {
          color: #ffffff;
          padding-left: 4px;
        }
        .ub-social-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          margin-right: 10px;
          text-decoration: none;
          transition: background 0.2s ease;
          font-size: 0.95rem;
        }
        .ub-social-icon:hover {
          background: rgba(255,255,255,0.35);
          color: #ffffff;
        }
        .ub-footer-divider {
          border-color: rgba(255,255,255,0.25);
          margin: 1.5rem 0 1rem;
        }
        .ub-brand {
          font-style: italic;
          font-weight: bold;
          font-size: 1.6rem;
          letter-spacing: 1px;
        }
      `}</style>

      <footer className="ub-footer">
        <div className="container-fluid">
          <div className="row gy-4">

            <div className="col-12 col-md-4">
              <div className="ub-brand mb-2">
                URBAN<span style={{ color: "#000000", fontWeight: "bold" }}>BITE</span>
              </div>
              <p className="mb-0" style={{ color: "rgba(255,255,255,0.85)", maxWidth: "300px" }}>
                Fresh, fast and delicious — delivered straight to your door.
              </p>
            </div>

            <div className="col-6 col-md-2">
              <h5>Company</h5>
              <Link to="/" className="ub-footer-link">Home</Link>
              <Link to="/myorder" className="ub-footer-link">My Order</Link>
              <Link to="/" className="ub-footer-link">About Us</Link>
            </div>

            <div className="col-6 col-md-2">
              <h5>Support</h5>
              <Link to="/" className="ub-footer-link">Contact</Link>
              <Link to="/" className="ub-footer-link">FAQ</Link>
              <Link to="/" className="ub-footer-link">Privacy Policy</Link>
            </div>

            <div className="col-12 col-md-4">
              <h5>Stay Connected</h5>
              <div className="d-flex">
                <a href="#" className="ub-social-icon" aria-label="Facebook">f</a>
                <a href="#" className="ub-social-icon" aria-label="Instagram">ig</a>
                <a href="#" className="ub-social-icon" aria-label="Twitter">tw</a>
              </div>
            </div>

          </div>

          <hr className="ub-footer-divider" />

          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <span style={{ color: "rgba(255,255,255,0.85)" }}>© 2026 URBANBITE, Inc</span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Made with care, served with love.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}