import React, { useState } from 'react';
import { productData } from '../../../components/ProductConstant';
import ReactPaginate from 'react-paginate';
import './OrderSuccess.css';

const OrderSuccess = () => {
    const productsList = productData;
    const itemsPerPage = 5; // Số sản phẩm hiển thị trên mỗi trang
    const [currentPage, setCurrentPage] = useState(0);

    // Lọc danh sách sản phẩm theo trạng thái (status) là 1
    const successfulOrders = productsList.filter((product) => product.status === 1);

    // Tính toán số trang
    const pageCount = Math.ceil(successfulOrders.length / itemsPerPage);

    // Lấy các sản phẩm cho trang hiện tại
    const displayedOrders = successfulOrders.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="order-success-container">
            <div className="order-title">Order Success</div>
            <ul className="order-list">
                {displayedOrders.map((product) => (
                    <li key={product.id} className="order-item">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <div className="product-details">
                            <div className="product-name">{product.name}</div>
                            <div className="product-quantity">Số lượng: {product.quantity}</div>
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
