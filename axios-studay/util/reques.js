import axios from 'axios';
import { message } from 'antd';

// 请求计数器
let requestCount = 0;

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 60000
});

axiosInstance.interceptors.request.use(config => {
     if (config.skipLoading) return config;
    // 第一个请求时显示加载提示
    if (requestCount === 0) {
        message.loading({
            content: '加载中...',
            key: 'globalLoading',
            duration: 0 // 不自动关闭
        });
    }
    requestCount++;
    return config;
});

axiosInstance.interceptors.response.use(
    response => {
        handleResponse();
        return response;
    },
    error => {
        handleResponse();
        message.error(error.message || '请求失败');
        return Promise.reject(error);
    }
);

// 统一处理响应
const handleResponse = () => {
    requestCount--;
    if (requestCount === 0) {
        message.destroy('globalLoading'); // 关闭指定key的提示
    }
};

const axiosRequest = {
    onGet: (url, params, skipLoading) => {
        return axiosInstance.get(url, { params, skipLoading }).then(res => res.data);
        // 不需要额外Promise封装，axios本身返回Promise
    }
};

export default axiosRequest;