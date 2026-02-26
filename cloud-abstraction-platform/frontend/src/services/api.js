import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = {
    deploy: async (provider, image, region) => {
        const response = await axios.post(`${API_URL}/deploy`, {
            provider,
            image,
            region
        });
        return response.data;
    },

    getDeployments: async () => {
        const response = await axios.get(`${API_URL}/deployments`);
        return response.data;
    },

    getStatus: async (id) => {
        const response = await axios.get(`${API_URL}/status/${id}`);
        return response.data;
    }
};

export default api;
