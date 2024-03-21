import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrder } from '../../../Service/APIService';
import { productData } from '../../../components/ProductConstant';
import { List, Avatar, Button, Pagination } from 'antd';
import './OrderSuccess.css';

const OrderSuccess = () => {
    const productsList = productData;
    const navigate = useNavigate(); // Khởi tạo navigate
    const itemsPerPage = 5; // Số sản phẩm hiển thị trên mỗi trang
    const [currentPage, setCurrentPage] = useState(0);
    const [order, setOrder] = useState([]); // Sửa thành useState([]) để lưu trữ danh sách đơn hàng

    // Lọc danh sách sản phẩm theo trạng thái (status) là 1
    const successfulOrders = productsList.filter((product) => product.status === 1);

    // Tính toán số trang
    const pageCount = Math.ceil(successfulOrders.length / itemsPerPage);

    // Lấy các sản phẩm cho trang hiện tại
    const displayedOrders = successfulOrders.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    useEffect(() => {
        getOrderSucess();
    }, []);

    const getOrderSucess = async () => {
        const order = await getOrder();
        setOrder(order); // Sét state order với dữ liệu trả về từ getOrder()
    };

    const handleViewDetails = (orderId) => {
        navigate(`/orderdetail/${orderId}`);
        console.log("View details for product ID:", orderId);
    };

    return (
        <div className="order-success-container">
            <div className="order-title">Order Success</div>
            <List
                className='list-order-item'
                dataSource={order}
                renderItem={product => (
                    <List.Item className="order-item">
                        <List.Item.Meta className='order-item-meta'
                            avatar={<Avatar size={128} shape="square" src={product.orderDetail.image} />}
                            title={<a className="product-name" href="#">{product.orderDetail.productName}</a>}
                            description={<span className="product-details">{`Total Quantity: ${product.totalQuantity}, Total Price: ${product.totalPrice}`}</span>}
                        />
                        <Button className="view-details-btn" type="primary" onClick={() => handleViewDetails(product.orderId)}>View Details</Button>
                    </List.Item>
                )}
            />
            <Pagination
                className="pagination"
                current={currentPage + 1}
                total={successfulOrders.length}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
            />
        </div>

    );
};

export default OrderSuccess;
