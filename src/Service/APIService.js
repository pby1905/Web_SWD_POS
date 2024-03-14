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
export {getOrder,deleteProductAPI,getAllProduct};