import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddProduct.css';

const AddProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        productName: '',
        price: 0,
        quantity: 0,
        description: '',
        categoryId: 0,
        addImages: [{ imagePath: '' }],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleAddProduct = async () => {
        try {
            await axios.post('https://localhost:7052/Products/addProduct', product);
            console.log('Product added:', product);
            toast.success('Product added successfully');
            navigate('/listproduct');
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Error adding product');
        }
    };
    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="add-product-container">
            <h2>Add Product</h2>
            <div>
                <label htmlFor="productName">Product Name:</label>
                <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={product.productName}
                    onChange={handleInputChange}
                />
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
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="categoryId">Category ID:</label>
                <input
                    type="number"
                    id="categoryId"
                    name="categoryId"
                    value={product.categoryId}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="imagePath">Image Path:</label>
                <input
                    type="text"
                    id="imagePath"
                    name="imagePath"
                    value={product.addImages.length > 0 ? product.addImages[0].imagePath : ''}
                    onChange={(e) =>
                        setProduct((prevProduct) => ({
                            ...prevProduct,
                            addImages: [{ imagePath: e.target.value }],
                        }))
                    }
                />
            </div>
            <div className="button-container">
                <button className="add-button" onClick={handleAddProduct}>
                    Add Product
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AddProduct;
