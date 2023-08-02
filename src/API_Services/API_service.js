import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const serverAddress = 'http://13.51.150.145:5000/api/colaborador';

export const GET_USER_TOKEN = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};

export const VALIDATE_LOGIN = async data => {
  const url = `${serverAddress}/login`;

  const response = await axios
    .post(url, data)
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_ALL_COUNTRY = async () => {
  const url = `${serverAddress}/all-country`;

  const response = await axios
    .get(url)
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_ALL_STATE = async id => {
  const url = `${serverAddress}/all-states?country_id=${id}`;

  const response = await axios
    .get(url)
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_ALL_CITIES = async id => {
  const url = `${serverAddress}/all-cities?state_id=${id}`;

  const response = await axios
    .get(url)
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const VALIDATE_SIGNUP = async data => {
  const url = `${serverAddress}/sign-up`;

  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const FORGET_PASSWORD = async data => {
  const url = `${serverAddress}/forget-password`;

  const response = await axios
    .post(url, data)
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const OTP_VERIFICATION = async data => {
  const url = `${serverAddress}/verify-otp`;

  const response = await axios
    .post(url, data)
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const RESET_PASSWORD = async data => {
  const url = `${serverAddress}/reset-password`;

  const response = await axios
    .post(url, data)
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_USER_PROFILE = async () => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/users-profile`;

  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const UPDATE_USER_PROFILE = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/update-profile`;

  const response = await axios
    .patch(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const VERIFY_QR = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/verify-qr`;

  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const UPDATE_PROFILE_IMAGE = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/upload-profile-pic`;

  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};
