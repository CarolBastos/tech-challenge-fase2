import axios from "axios";

interface retorno {
  
}

const http = axios.create({
    baseURL: 'http://localhost:3000/',
  });

  export default http