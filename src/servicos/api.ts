import axios from 'axios';

//Cria uma instância 'base' do Axios
const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
});

export default api;