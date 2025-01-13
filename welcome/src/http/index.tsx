import axios from "axios";

interface retorno {
  
}

const http = axios.create({
    baseURL: 'http://localhost:8080/',
  });

  export default http