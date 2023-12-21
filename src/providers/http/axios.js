import axios from "axios";
import { servicePath } from "constants/defaultValues";
import { getCurrentToken } from "helpers/Utils";

const auth = getCurrentToken();

export async function api({ method, url, body = {} }) {
  url = `${servicePath}/${url}`;
  return axios({
    url: url,
    method: method,
    data: body,
    headers: {
      "Content-Type": "application/json ", //the token is a variable which holds the token
      Accept: "application/json ", //the token is a variable which holds the token
      Authorization: "Bearer " + auth, //the token is a variable which holds the token
    },
  });
}

export function server_api({ method, url, body = {}, callback }) {
  url = `${servicePath}/${url}`;
  var api = axios({
    url: url,
    method: method,
    data: body,
    headers: {
      "Content-Type": "application/json ", //the token is a variable which holds the token
      Accept: "application/json ", //the token is a variable which holds the token
      Authorization: "Bearer " + auth, //the token is a variable which holds the token
    },
  });
  api.then((res) => {
    return callback(res.data);
  });
  api.catch((res) => {
    return callback(res);
  });
}

export const get = (url) => {
  return axios.get(`${servicePath}/${url}`, {
    headers: {
      "Content-Type": "application/json ",
      Accept: "application/json ",
      Authorization: `Bearer ${auth}`,
    },
  });
};

export const api_get = async (url) => {
  return axios.get(`${servicePath}/${url}`, {
    headers: {
      "Content-Type": "application/json ",
      Accept: "application/json ",
      Authorization: `Bearer ${auth}`,
    },
  });
};

export const api_post = async (url, data) => {
  return axios.post(`${servicePath}/${url}`, data, {
    headers: {
      "Content-Type": "application/json ",
      Accept: "application/json ",
      Authorization: `Bearer ${auth}`,
    },
  });
};

export const api_patch = async (url, data) => {
  return axios.patch(`${servicePath}/${url}`, data, {
    headers: {
      "Content-Type": "application/json ",
      Accept: "application/json ",
      Authorization: `Bearer ${auth}`,
    },
  });
};

export const api_delete = async (url, data) => {
  return axios.delete(`${servicePath}/${url}`, {
    headers: {
      "Content-Type": "application/json ",
      Accept: "application/json ",
      Authorization: `Bearer ${auth}`,
    },
    data,
  });

  return axios.delete(`${servicePath}/${url}`, data, {
    headers: {
      "Content-Type": "application/json ",
      Accept: "application/json ",
      Authorization: `Bearer ${auth}`,
    },
  });
};

export const api_put = async (url, id, data) => {
  return axios.post(`${servicePath}/${url}/${id}`, data, {
    headers: {
      "Content-Type": "application/json ",
      Accept: "application/json ",
      Authorization: `Bearer ${auth}`,
    },
  });
};
export default {};
