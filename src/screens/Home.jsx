import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
  const [foodCat, setFoodCat] = useState([])
  const [foodItem, setFoodItem] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/foodData`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0])
    setFoodCat(response[1])
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh" }}>

      <style>{`
        .ub-page {
          background-color: #121212;
          min-height: 100vh;
        }
        .ub-hero {
          position: relative;
          border-radius: 0 0 28px 28px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .ub-hero-img {
          height: 420px;
          width: 100%;
          object-fit: cover;
          filter: brightness(38%);
        }
        .ub-hero-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, rgba(18,18,18,0.95) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
        }
        .ub-hero-title {
          color: #ffffff;
          font-weight: 800;
          font-size: 2.6rem;
          text-align: center;
          margin-bottom: 0.4rem;
          letter-spacing: 0.5px;
        }
        .ub-hero-sub {
          color: rgba(255,255,255,0.75);
          font-size: 1.05rem;
          margin-bottom: 1.8rem;
          text-align: center;
        }
        .ub-search-wrap {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          border-radius: 50px;
          padding: 8px;
          display: flex;
          width: min(92%, 520px);
          box-shadow: 0 10px 26px rgba(0,0,0,0.3);
        }
        .ub-search-input {
          border: none;
          background: transparent;
          color: #ffffff;
          padding: 12px 20px;
          flex: 1;
          font-size: 1rem;
        }
        .ub-search-input::placeholder {
          color: rgba(255,255,255,0.55);
        }
        .ub-search-input:focus {
          outline: none;
          box-shadow: none;
        }
       .ub-search-btn {
          border: none;
          background: linear-gradient(90deg, #e0954a 0%, #f2a65a 100%);
          color: #1a1a1a;
          font-weight: 700;
          padding: 12px 28px;
          border-radius: 40px;
          transition: filter 0.2s ease, transform 0.2s ease;
        }
        .ub-search-btn:hover {
          filter: brightness(1.08);
          color: #1a1a1a;
          transform: translateY(-1px);
        }

        .ub-section {
          padding: 3rem 1.2rem;
          max-width: 1300px;
          margin: 0 auto;
        }
        .ub-cat-header {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 1.2rem;
        }
        .ub-cat-title {
          color: #ffffff;
          font-weight: 700;
          font-size: 1.6rem;
        }
        .ub-cat-count {
          color: rgba(255,255,255,0.45);
          font-size: 0.95rem;
        }
        .ub-cat-divider {
          border: none;
          height: 2px;
          background: linear-gradient(90deg, #16c98d, transparent);
          margin: 0 0 1.6rem 0;
        }
        .ub-empty-cat {
          color: rgba(255,255,255,0.4);
          font-style: italic;
          margin-bottom: 1.5rem;
        }
        .ub-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .ub-loading-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 0;
          color: rgba(255,255,255,0.6);
        }
        .ub-spinner {
          width: 42px;
          height: 42px;
          border: 4px solid rgba(255,255,255,0.15);
          border-top-color: #16c98d;
          border-radius: 50%;
          animation: ub-spin 0.8s linear infinite;
          margin-bottom: 1rem;
        }
        @keyframes ub-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <Navbar />

      <div className="ub-hero">
        <img
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&fit=crop"
          className="ub-hero-img"
          alt="Delicious food"
        />
        <div className="ub-hero-overlay">
          <div className="ub-hero-title">Cravings, Delivered.</div>
          <div className="ub-hero-sub">Fresh meals from your favorite local spots — ready in minutes.</div>
          <div className="ub-search-wrap">
            <input
              className="ub-search-input"
              type="search"
              placeholder="Search for dishes, cuisines..."
              aria-label="Search"
              value={search}
              onChange={(e) => { setSearch(e.target.value) }}
            />
            <button className="ub-search-btn" type="submit">Search</button>
          </div>
        </div>
      </div>

      <div className="ub-section">
        {loading ? (
          <div className="ub-loading-wrap">
            <div className="ub-spinner"></div>
            <div>Loading menu...</div>
          </div>
        ) : (
          foodCat && foodCat.length > 0
            ? foodCat.map((data) => {
              const filteredItems = foodItem && foodItem.length > 0
                ? foodItem.filter((item) => (
                  (item.CategoryName === data.CategoryName) &&
                  (item.name.toLowerCase().includes(search.toLowerCase()))
                ))
                : []

              return (
                <div key={data._id} className='mb-5'>
                  <div className="ub-cat-header">
                    <div className="ub-cat-title">{data.CategoryName}</div>
                    <div className="ub-cat-count">{filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}</div>
                  </div>
                  <hr className="ub-cat-divider" />

                  {filteredItems.length > 0 ? (
                    <div className="ub-grid">
                      {filteredItems.map(filterItems => (
                        <div key={filterItems._id}>
                          <Card foodItems={filterItems} options={filterItems.options[0]} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="ub-empty-cat">No matching items in this category.</div>
                  )}
                </div>
              )
            })
            : <div className="text-white-50 text-center py-5">No categories available.</div>
        )}
      </div>

      <Footer />
    </div>
  )
}