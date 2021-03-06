import axios from 'axios';

export function register({ user_type, name, surname, email, password, phone, birth_date, document_type, document_number }) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/account`, {
    user_type,
    name,
    surname: surname ? surname : null,
    email,
    password,
    phone,
    birth_date: birth_date ? birth_date : null,
    document_type: document_type ? document_type : null,
    document_number: document_number ? document_number : null,
  });
}

export function login(email, password) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth`, {
    email,
    password
  });
}

export function deleteAccount() {
  return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/acModif`);
}

export function editPassword(formData) {
  return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/acModif`, formData);
}