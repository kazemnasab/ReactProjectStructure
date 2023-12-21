import * as Api from "providers/http/axios";

const Controller = {
  Get: (url, params) => {
    return async () => {
      return await Api.api_get(url);
    };
  },
  GetAll: (url) => {
    return async () => {
      return await Api.api_get(url);
    };
  },
  GetById: (url, id) => {
    return async () => {
      return await Api.api_get(`${url}/${id}`);
    };
  },
  Post: (url, body) => {
    return async () => {
      return await Api.api_post(url, body);
    };
  },
};

export default Controller;