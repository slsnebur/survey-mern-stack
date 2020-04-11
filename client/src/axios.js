import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/api/users/login'
});

export default instance;
