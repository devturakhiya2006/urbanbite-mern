import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContexrReducer';

export default function Card(props) {
    let dispatch = useDispatchCart()
    let options = props.options;
    const priceRef = useRef()
    let priceOptions = Object.keys(options)
    let data = useCart()
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const [showToast, setShowToast] = useState(false)

    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItems._id) {
                food = item;
                break
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalPrice, qty: qty })
                triggerToast()
                return
            }
            else if (food.size !== size) {
                await dispatch({
                    type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice,
                    qty: qty, size: size, img: props.foodItems.img
                });
                triggerToast()
                return
            }
            return
        }
        await dispatch({
            type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice,
            qty: qty, size: size, img: props.foodItems.img
        });
        triggerToast()
    }

    const triggerToast = () => {
        setShowToast(true)
        setTimeout(() => setShowToast(false), 1800)
    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div>
            <style>{`
    .ub-card {
      width: 18rem;
      border: none;
      border-radius: 18px;
      overflow: hidden;
      background: #1f2022;
      box-shadow: 0 6px 18px rgba(0,0,0,0.35);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      position: relative;
    }

    .ub-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 14px 28px rgba(0,0,0,0.5);
    }

    .ub-card-img-wrap {
      position: relative;
      height: 190px;
      overflow: hidden;
    }

    .ub-card-img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    .ub-card:hover .ub-card-img {
      transform: scale(1.08);
    }

    .ub-price-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #f2a65a;
      color: #1a1a1a;
      font-weight: 700;
      font-size: 0.95rem;
      padding: 6px 14px;
      border-radius: 20px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    }

    .ub-card-title {
      color: #ffffff;
      font-weight: 600;
      font-size: 1.15rem;
      margin-bottom: 0.9rem;
    }

    .ub-select {
      background-color: #2b2b2b;
      color: #ffffff;
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 0.9rem;
    }

    .ub-select:focus {
      outline: none;
      border-color: #f2a65a;
      box-shadow: 0 0 0 2px rgba(242,166,90,0.25);
    }

    .ub-select-label {
      color: rgba(255,255,255,0.55);
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    .ub-divider {
      border-color: rgba(255,255,255,0.1);
      margin: 1rem 0;
    }

    .ub-add-btn {
      width: 100%;
      background: #f2a65a;
      border: none;
      color: #1a1a1a;
      font-weight: 700;
      padding: 10px 0;
      border-radius: 10px;
      transition: background 0.2s ease, transform 0.15s ease;
    }

    .ub-add-btn:hover {
      background: #e0954a;
      transform: translateY(-1px);
      color: #1a1a1a;
    }

    .ub-add-btn:active {
      transform: translateY(0);
    }

    .ub-toast {
      position: absolute;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      background: #f2a65a;
      color: #1a1a1a;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 700;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
      z-index: 50;
      white-space: nowrap;
    }

    .ub-toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  `}</style>

            <div className="card ub-card mt-3">
                <div className="ub-card-img-wrap">
                    <img src={props.foodItems.img} className="ub-card-img" alt={props.foodItems.name} />
                    <div className="ub-price-badge">₹{finalPrice}/-</div>
                </div>

                <div className="card-body p-3">
                    <h5 className="ub-card-title">{props.foodItems.name}</h5>

                    <div className="d-flex gap-3 mb-2">
                        <div className="flex-fill">
                            <div className="ub-select-label">Quantity</div>
                            <select className="ub-select w-100" onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className="flex-fill">
                            <div className="ub-select-label">Size</div>
                            <select className="ub-select w-100" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <hr className="ub-divider" />

                    <button className="btn ub-add-btn" onClick={handleAddToCart}>
                        {showToast ? "✓ Added!" : "Add To Cart"}
                    </button>
                </div>

                <div className={`ub-toast ${showToast ? 'show' : ''}`}>🛒 Added to cart</div>
            </div>
        </div>
    )
}