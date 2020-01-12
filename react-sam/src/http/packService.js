import axios from 'axios';

export function createPack({ createP }) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/packageP`, createP);
}
