import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      location: credentials.geolocation
    }))

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/createuser`, {
      method: 'POST',
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    })

    const json = await response.json()
    console.log(json);

    if (!response.ok) {
      console.log(json.errors);
      alert("Please enter valid details");
      return;
    }

    if (!json.success) {
      alert("Enter valid credentials")
    }
  }

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="ub-auth-page">
      <style>{`
         .ub-auth-page {
    min-height: 100vh;
    box-sizing: border-box;
    background: #17181a;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 2rem 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  .ub-auth-shell {
    display: flex;
    width: 100%;
    max-width: 900px;
    margin-top: 1rem;
    background: #1f2022;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  }

  .ub-auth-visual {
    flex: 1;
    position: relative;
    min-height: 620px;
    background: url("https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&auto=format&fit=crop&q=60")
    center/cover no-repeat;
  }



          .ub-auth-visual::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(0deg, rgba(0,0,0,0.78), rgba(0,0,0,0.12));
          }

          .ub-auth-visual-text {
            position: absolute;
            bottom: 32px;
            left: 32px;
            right: 32px;
            z-index: 2;
          }

          .ub-auth-visual-tag {
            color: #f2a65a;
            font-weight: 600;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 8px;
          }

          .ub-auth-visual-title {
            color: #ffffff;
            font-size: 1.6rem;
            font-weight: 700;
            line-height: 1.3;
          }

           .ub-auth-form-side {
    flex: 1;
    padding: 2rem 2.8rem;
    display: flex;
           flex-direction: column;
           justify-content: flex-start;
           }

          .ub-auth-brand {
            font-weight: 800;
            font-size: 1.3rem;
            color: #f2f2f2;
            margin-bottom: 2rem;
            letter-spacing: 0.5px;
          }

          .ub-auth-brand span {
            color: #f2a65a;
          }

          .ub-auth-heading {
            color: #ffffff;
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 0.4rem;
          }

          .ub-auth-subtitle {
            color: #9a9a9a;
            font-size: 0.92rem;
            margin-bottom: 2rem;
          }

          .ub-form-label {
            color: #c7c7c7;
            font-weight: 600;
            font-size: 0.82rem;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            margin-bottom: 0.4rem;
            display: block;
          }

          .ub-form-input {
            background: transparent;
            border: none;
            border-bottom: 2px solid #3a3b3d;
            color: #ffffff;
            padding: 8px 2px;
            font-size: 0.98rem;
            width: 100%;
            border-radius: 0;
          }

          .ub-form-input::placeholder {
            color: #55565a;
          }

          .ub-form-input:focus {
            outline: none;
            border-bottom-color: #f2a65a;
          }

          .ub-form-help {
            color: #666;
            font-size: 0.76rem;
            margin-top: 0.4rem;
          }

          .ub-submit-btn {
            width: 100%;
            background: #f2a65a;
            border: none;
            color: #1a1a1a;
            font-weight: 700;
            padding: 13px 0;
            border-radius: 6px;
            font-size: 0.95rem;
            margin-top: 1.6rem;
            transition: background 0.2s ease;
          }

          .ub-submit-btn:hover {
            background: #e0954a;
          }

          .ub-signup-row {
            text-align: center;
            margin-top: 1.4rem;
            color: #8c8c8c;
            font-size: 0.9rem;
          }

          .ub-signup-row a {
            color: #f2a65a;
            font-weight: 600;
            text-decoration: none;
          }

          .ub-signup-row a:hover {
            text-decoration: underline;
          }

          @media (max-width: 720px) {
            .ub-auth-visual {
              display: none;
            }

            .ub-auth-form-side {
              padding: 2.5rem 1.8rem;
            }
          }
        `}</style>

      <div className="ub-auth-shell">
        <div className="ub-auth-visual">
          <div className="ub-auth-visual-text">
            <div className="ub-auth-visual-tag">Fresh · Fast · Local</div>
            <div className="ub-auth-visual-title">
              Your next favourite meal<br />is just one order away.
            </div>
          </div>
        </div>

        <div className="ub-auth-form-side">
          <div className="ub-auth-brand">URBAN<span>BITE</span></div>
          <div className="ub-auth-heading">Create your account</div>
          <div className="ub-auth-subtitle">
            Join us and start ordering delicious food.
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="ub-form-label">Name</label>
              <input
                type="text"
                className="ub-form-input"
                name="name"
                value={credentials.name}
                onChange={onChange}
                id="name"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-3 mt-4">
              <label htmlFor="email" className="ub-form-label">Email address</label>
              <input
                type="email"
                className="ub-form-input"
                name="email"
                value={credentials.email}
                onChange={onChange}
                id="email"
                placeholder="you@example.com"
              />
              <div className="ub-form-help">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-3 mt-4">
              <label htmlFor="password" className="ub-form-label">Password</label>
              <input
                type="password"
                className="ub-form-input"
                name="password"
                value={credentials.password}
                onChange={onChange}
                id="password"
                placeholder="Create a password"
              />
            </div>

            <div className="mb-3 mt-4">
              <label htmlFor="geolocation" className="ub-form-label">Address</label>
              <input
                type="text"
                className="ub-form-input"
                name="geolocation"
                value={credentials.geolocation}
                onChange={onChange}
                id="geolocation"
                placeholder="Enter your address"
              />
            </div>

            <button type="submit" className="ub-submit-btn">
              Create Account
            </button>

            <div className="ub-signup-row">
              Already a user? <Link to="/login">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
