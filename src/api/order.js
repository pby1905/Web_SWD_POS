import requestWebAdmin from '~/utils/axios';

export const getOrderId = async (orderId) => {
    try {
        const response = await requestWebAdmin.get(`/Order/Order_Detail?orderId=${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching driver info:', error);
        throw error;
    }
};
