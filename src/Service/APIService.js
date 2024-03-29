import axios from './CustomService';
const getOrder = () => {
    return axios.get('Order/Order_Successfully');
}
const getOrderDetail = (orderId) => {
    return axios.get(`Order/Order_Detail?orderId=${orderId}`);
}
const deleteProductAPI = (productId) => {
    return axios.post(`Products/deleteProduct?productID=${productId}`)
}
const getAllProduct = () => {
    return axios.get('Products/ProductList');
}
const updateProduct = (productId, Requestdata) => {
    return axios.post(`Products/UpdateProduct?productId=${productId}`, Requestdata);
}
const apiGetProductById = (productId) => {
    return axios.get(`Products/getProductID?productId=${productId}`)

}
const totalMonthRevenue = (monthID) =>{
 return axios.get(`Order/Total_MonthRevenue?month=${monthID}`)
}
export { getOrder, deleteProductAPI, getAllProduct, updateProduct, apiGetProductById, getOrderDetail ,totalMonthRevenue};