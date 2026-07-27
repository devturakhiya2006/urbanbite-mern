import React from 'react'
import { useCart, useDispatchCart } from '../components/ContexrReducer';
import { Link } from 'react-router-dom';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div>
                <style>{`
                    .ub-empty-wrap {
                        min-height: 300px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        color: rgba(255,255,255,0.7);
                    }
                    .ub-empty-icon {
                        font-size: 3rem;
                        margin-bottom: 1rem;
                        opacity: 0.6;
                    }
                `}</style>
                <div className='ub-empty-wrap'>
                    <div className="ub-empty-icon">🛒</div>
                    <div className='fs-3 fw-semibold'>The Cart is Empty!</div>
                    <div className="mt-1" style={{ fontSize: "0.95rem", opacity: 0.7 }}>Add something delicious to get started.</div>
                </div>
            </div>
        )
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        console.log("Current user email from storage:", userEmail);
        let response = await fetch("http://localhost:5000/api/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });

        let responseJson = await response.json();
        console.log("JSON RESPONSE:::::", responseJson);

        if (response.ok && responseJson.success) {
            dispatch({ type: "DROP" });
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)

    return (
        <div>
            {console.log(data)}
            <style>{`
                .ub-cart-wrap {
                    max-width: 850px;
                    margin: 0 auto;
                    padding: 2rem 1rem 3rem;
                }
                .ub-cart-title {
                    color: #ffffff;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                }
                .ub-item-row {
                    background: #1e1e1e;
                    border-radius: 14px;
                    padding: 14px 18px;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
                    transition: transform 0.15s ease, box-shadow 0.15s ease;
                }
                .ub-item-row:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 18px rgba(0,0,0,0.35);
                }
                .ub-item-info {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }
                .ub-item-index {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: linear-gradient(90deg, #ff7a00 0%, #ff9a3d 100%);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 0.85rem;
                    flex-shrink: 0;
                }
                .ub-item-name {
                    color: #ffffff;
                    font-weight: 600;
                    font-size: 1.05rem;
                }
                .ub-item-meta {
                    color: rgba(255,255,255,0.55);
                    font-size: 0.82rem;
                    margin-top: 2px;
                }
                .ub-item-price {
                    color: #ff9a3d;
                    font-weight: 700;
                    font-size: 1.05rem;
                    margin-right: 18px;
                    white-space: nowrap;
                }
                .ub-delete-btn {
                    background: rgba(220, 53, 69, 0.15);
                    color: #ff6b7a;
                    border: 1px solid rgba(220, 53, 69, 0.4);
                    border-radius: 8px;
                    padding: 5px 12px;
                    font-size: 0.82rem;
                    font-weight: 600;
                    transition: background 0.2s ease, color 0.2s ease;
                }
                .ub-delete-btn:hover {
                    background: #dc3545;
                    color: #ffffff;
                }
                .ub-summary {
                    background: #1e1e1e;
                    border-radius: 14px;
                    padding: 20px 24px;
                    margin-top: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 16px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
                }
                .ub-total-label {
                    color: rgba(255,255,255,0.6);
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .ub-total-amount {
                    color: #ffffff;
                    font-weight: 700;
                    font-size: 1.7rem;
                }
                .ub-checkout-btn {
                    background: linear-gradient(90deg, #ff7a00 0%, #ff9a3d 100%);
                    border: none;
                    color: #ffffff;
                    font-weight: 700;
                    padding: 12px 32px;
                    border-radius: 12px;
                    font-size: 1rem;
                    transition: filter 0.2s ease, transform 0.15s ease;
                }
                .ub-checkout-btn:hover {
                    filter: brightness(1.1);
                    transform: translateY(-1px);
                    color: #fff;
                }
            `}</style>

            <div className='ub-cart-wrap'>
                <h2 className="ub-cart-title">Your Cart</h2>

                {data.map((food, index) => (
                    <div className="ub-item-row" key={index}>
                        <div className="ub-item-info">
                            <div className="ub-item-index">{index + 1}</div>
                            <div>
                                <div className="ub-item-name">{food.name}</div>
                                <div className="ub-item-meta">Qty: {food.qty} &nbsp;•&nbsp; Size: {food.size}</div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="ub-item-price">₹{food.price}/-</div>
                            <button
                                type="button"
                                className="ub-delete-btn"
                                onClick={() => { dispatch({ type: "REMOVE", index: index }) }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                <div className="ub-summary">
                    <div>
                        <div className="ub-total-label">Total Price</div>
                        <div className="ub-total-amount">₹{totalPrice}/-</div>
                    </div>
                    <button className="ub-checkout-btn" onClick={handleCheckOut}>
                        Check Out
                    </button>
                </div>
            </div>
        </div>
    )
}