import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Card, Image } from 'antd';
import { getOrderDetail } from '~/Service/APIService';

const { Meta } = Card;

const OrderDetail = () => {
    const { id } = useParams();
    const [detailOrder, setDetailOrder] = useState({});

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const res = await getOrderDetail(id);
            setDetailOrder(res);
        } catch (error) {
            console.log(error);
        }
    };

    if (!detailOrder) {
        return <div>Loading...</div>;
    }

    const { orderId, totalPrice, creationDate, totalQuantity, product } = detailOrder;

    return (
        <div className="order-detail-container">
            <h2 className="order-detail-title">Order Detail</h2>
            <Card style={{ width: 600, marginTop: 16 }}>
                <Descriptions title="Order Info">
                    <Descriptions.Item label="Order ID">{orderId}</Descriptions.Item>
                    <Descriptions.Item label="Total Price">${totalPrice}</Descriptions.Item>
                    <Descriptions.Item label="Order Date">{creationDate ? new Date(creationDate).toLocaleDateString() : 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label="Total Quantity">{totalQuantity}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Card style={{ width: 600, marginTop: 16 }}>
                <h3>Product Information</h3>
                {product.map(item => (
                    <Card key={item.productId} style={{ width: 300, marginBottom: 16 }} cover={<Image alt={item.productName} src={item.image} />}>
                        <Meta title={item.productName} description={`Price: $${item.price}, Quantity: ${item.quantity}`} />
                    </Card>
                ))}
            </Card>
        </div>
    );
};

export default OrderDetail;
