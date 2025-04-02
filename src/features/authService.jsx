import axiosInstance from '../store/axiosConfig';

export const registerUserApi = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUserApi = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const registerOtpVerify = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/verify-otp', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
