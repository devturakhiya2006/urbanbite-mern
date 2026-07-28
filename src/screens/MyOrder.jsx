import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MyOrder() {
    const [orderData, setOrderData] = useState("");

    const fetchMyOrder = async () => {
        try {
            console.log(localStorage.getItem('userEmail'));
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/myOrderData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });
            const response = await res.json();
            setOrderData(response);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
            <style>{`
                .ub-orders-page {
                    background: #121212;
                    min-height: 100vh;
                }
                .ub-orders-wrap {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 2.5rem 1.2rem 4rem;
                }
                .ub-orders-title {
                    color: #ffffff;
                    font-weight: 700;
                    font-size: 1.8rem;
                    margin-bottom: 2rem;
                }
                .ub-order-date-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin: 2rem 0 1.2rem;
                }
                .ub-order-date-badge {
                    background: linear-gradient(90deg, #e0954a 0%, #f2a65a 100%);
                    color: #ffffff;
                    font-weight: 700;
                    font-size: 0.85rem;
                    padding: 6px 16px;
                    border-radius: 20px;
                    white-space: nowrap;
                }
                .ub-order-date-line {
                    flex: 1;
                    height: 1px;
                    background: rgba(255,255,255,0.1);
                }
                .ub-order-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1.2rem;
                    margin-right: 1rem;
                    margin-bottom: 1rem;
                }
                .ub-order-card {
                    width: 15.5rem;
                    background: #1e1e1e;
                    border-radius: 14px;
                    overflow: hidden;
                    box-shadow: 0 6px 16px rgba(0,0,0,0.3);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .ub-order-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 22px rgba(0,0,0,0.4);
                }
                .ub-order-card-img {
                    height: 130px;
                    width: 100%;
                    object-fit: cover;
                }
                .ub-order-card-body {
                    padding: 12px 14px;
                }
                .ub-order-card-title {
                    color: #ffffff;
                    font-weight: 600;
                    font-size: 1rem;
                    margin-bottom: 8px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .ub-order-card-meta {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 6px;
                }
                .ub-order-tag {
                    background: rgba(255,255,255,0.08);
                    color: rgba(255,255,255,0.7);
                    font-size: 0.78rem;
                    padding: 3px 10px;
                    border-radius: 12px;
                }
                .ub-order-price {
                    color: #f2a65a;
                    font-weight: 700;
                    font-size: 1rem;
                }
                .ub-orders-empty {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 300px;
                    color: rgba(255,255,255,0.6);
                }
                .ub-orders-empty-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    opacity: 0.6;
                }
            `}</style>

            <div className="ub-orders-page">
                <Navbar />

                <div className="ub-orders-wrap">
                    <div className="ub-orders-title">My Orders</div>

                    {orderData && orderData.orderData ? (
                        orderData.orderData.order_data.slice(0).reverse().map((item, index) => {
                            let orderDate = '';
                            return (
                                <div key={index}>
                                    {item.map((arrayData, subIndex) => {
                                        if (arrayData.Order_date) {
                                            orderDate = arrayData.Order_date;
                                            return (
                                                <div key={subIndex} className='ub-order-date-header'>
                                                    <div className="ub-order-date-badge">{orderDate}</div>
                                                    <div className="ub-order-date-line"></div>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div key={subIndex} className='ub-order-grid mb-1 gap-2' style={{ display: 'inline-flex' }}>
                                                    <div className="ub-order-card">
                                                        <img src={arrayData.img} className="ub-order-card-img" alt={arrayData.name} />
                                                        <div className="ub-order-card-body">
                                                            <div className="ub-order-card-title">{arrayData.name}</div>
                                                            <div className="ub-order-card-meta">
                                                                <span className="ub-order-tag">Qty: {arrayData.qty}</span>
                                                                <span className="ub-order-tag">{arrayData.size}</span>
                                                                <span className="ub-order-price">₹{arrayData.price}/-</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            );
                        })
                    ) : (
                        <div className="ub-orders-empty">
                            <div className="ub-orders-empty-icon">📦</div>
                            <div className="fs-4 fw-semibold">No orders yet</div>
                            <div style={{ fontSize: "0.9rem", opacity: 0.7 }} className="mt-1">Your order history will show up here.</div>
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </>
    );
}