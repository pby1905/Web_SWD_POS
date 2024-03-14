// EditProduct.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditProduct.css'; // Import CSS file
import { apiGetProductById, updateProduct } from '~/Service/APIService';

const EditProduct = () => {
    const { id } = useParams();

    const [product, setProduct] = useState({
        name: '',
        price: 0,
        quantity: 0,
    });
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        getProductID()
        fetchingData()
    }, []);

    console.log(detailProduct)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        console.log(product)

        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
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
            const res = await updateProduct(id, product)
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div className="edit-product-container">
            <h2>Edit Product</h2>
            <div>
                <img src={product.imageUrl} className="image-preview" />
            </div>
            <div>
                <label htmlFor="name">Product Name:</label>
                <input placeholder={detailProduct.productName ? detailProduct.productName : ''} type="text" id="name" name="name" value={product.name} onChange={handleInputChange} />
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

            <div>
                <button onClick={fetchingData}>Save Changes</button>
            </div>
        </div>
    );
};

export default EditProduct;
