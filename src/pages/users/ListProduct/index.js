import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './ListProduct.css';
import { deleteProductAPI } from '../../../Service/APIService';
const itemsPerPage = 5;

const ListProduct = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteP, setDelete] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://localhost:7052/Products/ProductList');
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const displayedProducts = products.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handleEdit = (productId) => {
        navigate(`/editproduct/${productId}`); // Chuyển hướng đến trang chỉnh sửa sản phẩm với id của sản phẩm
    };

    const handleDelete = async (productId) => {
        try {
            await deleteProductAPI(productId);
            toast.success('Product deleted successfully');
            window.location.reload();
            console.log(`Delete product with ID: ${productId}`);
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product');
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-list-container-all">
            <h2>List of Products</h2>

            <div className="product-list-container">
                <div className="product-list-container-button">
                    <button className="add-product" onClick={() => navigate('/addproduct')}>
                        + Add Product
                    </button>
                </div>
                <ul className="product-list">
                    {displayedProducts.map((product) => (
                        <li key={product.productId} className="product-item">
                            {product.listImages.length > 0 && (
                                <img
                                    src={product.listImages[0].imagePath}
                                    alt={product.productName}
                                    className="product-image"
                                />
                            )}
                            <div className="product-info">
                                <span className="product-name">{product.productName}</span>
                                <span className="product-quantity-f">{`Quantity: ${product.quantity}`}</span>
                                <span className="product-price">{`Price: $${product.price.toFixed(2)}`}</span>
                            </div>
                            <button className="list-edit-button" onClick={() => handleEdit(product.productId)}>
                                Edit
                            </button>
                            <button className="list-delete-button" onClick={() => handleDelete(product.productId)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                <ReactPaginate
                    pageCount={Math.ceil(products.length / itemsPerPage)}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
        </div>
    );
};

export default ListProduct;
