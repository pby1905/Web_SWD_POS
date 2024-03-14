import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import './EditProduct.css';
import { apiGetProductById, updateProduct } from '~/Service/APIService';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Khởi tạo navigate

    const [product, setProduct] = useState({
        productName: '',
        price: 0,
        quantity: 0,
        images: [], // Thêm mảng images vào state product để lưu thông tin về ảnh sản phẩm
    });

    const [detailProduct, setDetailProduct] = useState({}); // Sử dụng object thay vì mảng để lưu thông tin chi tiết sản phẩm

    useEffect(() => {
        getProductID()
        const fetchData = async () => {
            try {
                const res = await apiGetProductById(id);
                setDetailProduct(res);
                setProduct(res); // Set dữ liệu chi tiết sản phẩm vào state product
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    console.log(detailProduct)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        console.log(product)

        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };
    const handleImageInputChange = (e) => {
        const { value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            images: [{ imagePath: value }], // Cập nhật đường dẫn ảnh vào state product
        }));
    };

    const getProductID = async () => {
        try {
            const res = await apiGetProductById(id)
            setDetailProduct(res)

        } catch (error) {
            console.log(error)
        }
    }

    const fetchingData = async () => {
        try {
            const res = await updateProduct(id, product);
            console.log(res);
            navigate('/listproduct'); // Chuyển hướng đến '/listproduct' sau khi lưu thành công bằng navigate
            return res;
        } catch (error) {
            console.log(error);
        }
    };
    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="edit-product-container">
            <h2>Edit Product</h2>
            <div>
                <img src={product.images && product.images.length > 0 ? product.images[0].imagePath : ''} className="image-preview" alt="Product" />
            </div>
            <div>
                <label htmlFor="imagePath">Image Path:</label>
                <input type="text" id="imagePath" name="imagePath" value={product.images && product.images.length > 0 ? product.images[0].imagePath : ''} onChange={handleImageInputChange} />
            </div>
            <div>
                <label htmlFor="productName">Product Name:</label>
                <input placeholder={detailProduct.productName ? detailProduct.productName : ''} type="text" id="productName" name="productName" value={product.name} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleInputChange}
                    placeholder={detailProduct.quantity ? detailProduct.quantity : ''}
                />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input placeholder={detailProduct.price ? detailProduct.price : ''} type="number" id="price" name="price" value={product.price} onChange={handleInputChange} />
            </div>
            <div className="edit-button-container">
                <button className="edit-button" onClick={fetchingData}>Save</button>
                <button className="cancel-button" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditProduct;
