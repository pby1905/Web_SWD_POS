import React, { useState, useEffect } from 'react';
import { getOrder } from '../../../Service/APIService';
import { productData } from '../../../components/ProductConstant';
import ReactPaginate from 'react-paginate';
import './OrderSuccess.css';

const OrderSuccess = () => {
    const productsList = productData;
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

    return (
        <div className="order-success-container">
            <div className="order-title">Order Success</div>
            <ul className="order-list">
                {order.map((product) => ( // Sử dụng order thay vì Iphone
                   <li key={product.id} className="order-item">
                   <img src={product.imageOrders[0].imagePath} alt={product.productN.productName} className="product-image" />
                   <div className="order-details">
                       <div className="product-name">{product.productN.productName}</div>
                       <div className="product-quantity">Quantity: {product.quantity}</div>
                       <div className="product-price">Price: {product.price}</div>
                   </div>
               </li>
                ))}
            </ul>
            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    );
};

export default OrderSuccess;
