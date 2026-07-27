import React from 'react'

export default function Carousel() {
    return (
        <div>
            <style>{`
    .cb-search-wrap {
      background: rgba(31, 32, 34, 0.88);
      backdrop-filter: blur(6px);
      padding: 10px;
      border: 1px solid rgba(242, 166, 90, 0.25);
      border-radius: 50px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
    }

    .cb-search-input {
      background: transparent;
      color: #ffffff;
      border: none;
      border-radius: 50px 0 0 50px;
      padding: 12px 20px;
      font-size: 1rem;
    }

    .cb-search-input::placeholder {
      color: #999999;
    }

    .cb-search-input:focus {
      background: transparent;
      color: #ffffff;
      box-shadow: none;
      outline: none;
    }

    .cb-search-btn {
      background: #f2a65a !important;
      color: #1a1a1a !important;
      border-radius: 0 50px 50px 0 !important;
      padding: 12px 28px;
      font-weight: 700;
    border: 1px solid #f2a65a !important;
        }

    .cb-search-btn:hover {
 background-color: #e0954a !important;
    border-color: #e0954a !important;
    color: #1a1a1a !important;
        }

    .cb-slide-img {
      height: 400px;
      object-fit: cover;
    }

    .cb-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        180deg,
        rgba(0,0,0,0.6) 0%,
        rgba(0,0,0,0.35) 50%,
        rgba(0,0,0,0.75) 100%
      );
    }

    .cb-caption {
      top: 50% !important;
      bottom: auto !important;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
    }

    .carousel-control-prev,
    .carousel-control-next {
      width: 5%;
    }

    .carousel-control-prev-icon,
    .carousel-control-next-icon {
      background-color: #f2a65a;
      border-radius: 50%;
      padding: 20px;
      background-size: 50%;
    }
  `}</style>

            <div id="carouselExampleFade" className="carousel slide carousel-fade rounded-4 overflow-hidden shadow" data-bs-ride="carousel">
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption cb-caption" style={{ zIndex: "10" }}>
                        <form className="d-flex cb-search-wrap" style={{ width: "min(90%, 500px)" }}>
                            <input className="form-control cb-search-input" type="search" placeholder="Search" aria-label="Search" />
                            <button className="cb-search-btn" type="submit"> Search</button>
                        </form>
                    </div>

                    {/* Burger */}
                    <div className="carousel-item active position-relative">
                        <img
                            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900&h=700&fit=crop"
                            className="d-block w-100 cb-slide-img"
                            alt="Burger"
                        />
                        <div className="cb-overlay"></div>
                    </div>

                    {/* Pastry */}
                    <div className="carousel-item position-relative">
                        <img
                            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emElMjBzaXplJTIwNzAwJTIwKjkwMHxlbnwwfHwwfHx8MA%3D%3D"
                            className="d-block w-100 cb-slide-img"
                            alt="Pastry"
                        />
                        <div className="cb-overlay"></div>
                    </div>

                    {/* Barbeque */}
                    <div className="carousel-item position-relative">
                        <img
                            src="https://images.unsplash.com/photo-1660338620055-eab03d197e57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QmFyYmVxdWUlMjA3MDAqOTAwJTIwdmVnfGVufDB8fDB8fHww"
                            className="d-block w-100 cb-slide-img"
                            alt="Barbeque"
                        />
                        <div className="cb-overlay"></div>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}