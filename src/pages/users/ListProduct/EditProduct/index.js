import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditProduct.css';

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        productName: '',
        price: 0,
        quantity: 0,
        description: '',
        images: [{ imagePath: '' }],
    });

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get(`https://localhost:7052/Products/GetProductById?id=${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }

        fetchProduct();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`https://localhost:7052/Products/UpdateProduct?productId=${id}`, product);
            console.log('Product updated:', product);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="edit-product-container">
            <h2>Edit Product</h2>
            <div>
                <img src={product.images[0].imagePath} className="image-preview" alt="Product" />
            </div>
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
                <textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="imagePath">Image URL:</label>
                <input
                    type="text"
                    id="imagePath"
                    name="imagePath"
                    value={product.images[0].imagePath}
                    onChange={(e) =>
                        setProduct((prevProduct) => ({ ...prevProduct, images: [{ imagePath: e.target.value }] }))
                    }
                />
            </div>

            <div>
                <button onClick={handleSaveChanges}>Save Changes</button>
            </div>
        </div>
    );
};

export default EditProduct;
