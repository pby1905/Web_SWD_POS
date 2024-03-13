// EditProduct.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditProduct.css'; // Import CSS file

const EditProduct = () => {
    const { id } = useParams();

    const [product, setProduct] = useState({});

    useEffect(() => {
        // Tải dữ liệu sản phẩm từ nguồn dữ liệu của bạn (API hoặc Redux store)
        // sử dụng id để xác định sản phẩm cần chỉnh sửa
        // và cập nhật state 'product' với dữ liệu tương ứng
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleSaveChanges = () => {
        // Đây là nơi bạn có thể gửi dữ liệu cập nhật lên server hoặc cập nhật Redux store
        console.log('Product updated:', product);
    };

    return (
        <div className="edit-product-container">
            <h2>Edit Product</h2>
            <div>
                <img src={product.imageUrl} className="image-preview" />
            </div>
            <div>
                <label htmlFor="name">Product Name:</label>
                <input type="text" id="name" name="name" value={product.name} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={product.price} onChange={handleInputChange} />
            </div>

            <div>
                <button onClick={handleSaveChanges}>Save Changes</button>
            </div>
        </div>
    );
};

export default EditProduct;
