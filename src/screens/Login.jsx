import React, { useState } from 'react'
  import { Link, useNavigate } from 'react-router-dom'

  export default function Login() {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:5000/api/loginuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          })
        })

        const json = await response.json()

        if (!response.ok || !json.success) {
          let message = "Enter valid email and password."

          if (json.errors) {
            if (Array.isArray(json.errors)) {
              message = json.errors.map((err) => err.msg || err.message || "Invalid details").join("\n")
            } else if (typeof json.errors === "string") {
              message = json.errors
            }
          } else if (json.error) {
            message = json.error
          }

          alert(message)
          return
        }

        localStorage.setItem("userEmail", credentials.email)
        localStorage.setItem("authToken", json.authToken)

        navigate("/", { replace: true })
      } catch (error) {
        console.error("Login error:", error)
        alert("Unable to connect to the server. Make sure your backend is running on port 5000.")
      }
    }

    const onChange = (e) => {
      setcredentials({
        ...credentials,
        [e.target.name]: e.target.value
      })
    }

    return (
      <div className="ub-auth-page">
        <style>{`
          .ub-auth-page {
            min-height: 100vh;
            box-sizing: border-box;
            background: #17181a;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 1rem;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }

          .ub-auth-shell {
            display: flex;
            width: 100%;
            max-width: 860px;
            background: #1f2022;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          }

          .ub-auth-visual {
            flex: 1;
            position: relative;
            min-height: 560px;
            background: url("https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&auto=format&fit=crop&q=60") center/cover no-repeat;
          }

          .ub-auth-visual::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(0deg, rgba(0,0,0,0.75), rgba(0,0,0,0.15));
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
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 8px;
          }

          .ub-auth-visual-title {
            color: #fff;
            font-size: 1.6rem;
            font-weight: 700;
            line-height: 1.3;
          }

          .ub-auth-form-side {
            flex: 1;
            padding: 3rem 2.8rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .ub-auth-brand {
            color: #f2f2f2;
            font-size: 1.3rem;
            font-weight: 800;
            letter-spacing: 0.5px;
            margin-bottom: 2rem;
          }

          .ub-auth-brand span,
          .ub-signup-row a {
            color: #f2a65a;
          }

          .ub-auth-heading {
            color: #fff;
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
            display: block;
            font-size: 0.82rem;
            font-weight: 600;
            letter-spacing: 0.4px;
            margin-bottom: 0.4rem;
            text-transform: uppercase;
          }

          .ub-form-input {
            width: 100%;
            background: transparent;
            border: none;
            border-bottom: 2px solid #3a3b3d;
            border-radius: 0;
            color: #fff;
            font-size: 0.98rem;
            padding: 8px 2px;
          }

          .ub-form-input:focus {
            outline: none;
            border-bottom-color: #f2a65a;
          }

          .ub-form-input::placeholder {
            color: #55565a;
          }

          .ub-form-help {
            color: #777;
            font-size: 0.76rem;
            margin-top: 0.4rem;
          }

          .ub-submit-btn {
            width: 100%;
            background: #f2a65a;
            border: none;
            border-radius: 6px;
            color: #1a1a1a;
            cursor: pointer;
            font-size: 0.95rem;
            font-weight: 700;
            margin-top: 1.6rem;
            padding: 13px 0;
          }

          .ub-submit-btn:hover {
            background: #e0954a;
          }

          .ub-signup-row {
            color: #8c8c8c;
            font-size: 0.9rem;
            margin-top: 1.4rem;
            text-align: center;
          }

          .ub-signup-row a {
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
                Good food finds<br />its way back to you.
              </div>
            </div>
          </div>

          <div className="ub-auth-form-side">
            <div className="ub-auth-brand">URBAN<span>BITE</span></div>
            <div className="ub-auth-heading">Login to your account</div>
            <div className="ub-auth-subtitle">
              Enter your details to continue ordering.
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="ub-form-label">Email address</label>
                <input
                  id="email"
                  type="email"
                  className="ub-form-input"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  placeholder="you@example.com"
                  required
                />
                <div className="ub-form-help">
                  We'll never share your email with anyone else.
                </div>
              </div>

              <div className="mb-3 mt-4">
                <label htmlFor="password" className="ub-form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  className="ub-form-input"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className="ub-submit-btn">Login</button>

              <div className="ub-signup-row">
                New here? <Link to="/createuser">Create an account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }