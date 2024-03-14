import axios  from './CustomService';
const getOrder =() =>{
    return axios.get('Order/Order_Successfully');
}
const deleteProductAPI =(productId) =>{
return axios.post(`Products/deleteProduct?productID=${productId}`)
}
const getAllProduct =() =>{
    return axios.get('Products/ProductList');
}
const updateProduct = (productId,Requestdata) =>{
    return axios.post(`Products/UpdateProduct?productId=${productId}`,Requestdata);
}
const apiGetProductById = (productId)=>{
    return axios.get(`Products/getProductID?productId=${productId}`)
}
export {getOrder,deleteProductAPI,getAllProduct,updateProduct, apiGetProductById};