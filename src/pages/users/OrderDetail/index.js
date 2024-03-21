import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OrderDetail.css'; 

const OrderDetail = () => {
    const { id } = useParams();
    const [detailOrder, setDetailOrder] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOrderDetail = async () => {
        try {
            const response = await axios.get(`https://localhost:7052/Order/Order_Detail?orderId=${id}`);
            setDetailOrder(response.data);
            setProduct(response.data.product[0]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching order detail:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderDetail();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!detailOrder) {
        return <div>No data found</div>;
    }

    const { totalPrice, creationDate, totalQuantity } = detailOrder;

    return (
        <div className="order-detail-container">
        <h2 className="order-detail-title">Order Detail</h2>
    
        <div className="order-detail-card">
            <div className="order-detail-image-container">
                <img src={product.image} alt={product.productName} className="order-detail-image" />
            </div>
            <div className="order-detail-info">
                <div className="order-detail-product-name">
                    <strong>{product.productName}</strong>
                </div>
                <div className='order-detail-product-des'>
                    <p>Price: ${product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Order Date: {creationDate ? new Date(creationDate).toLocaleDateString() : 'N/A'}</p>
                    <p>Total Price: ${totalPrice}</p>
                    <p>Total Quantity: {totalQuantity}</p>
                    <p className="order-detail-total-price">Total: ${totalPrice * totalQuantity}</p>
                </div>
               
            </div>
        </div>
    </div>
    
    
    );
};

export default OrderDetail;
