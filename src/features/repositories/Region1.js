import * as Api from "providers/http/axios";

const Controller = {
  Urls: {
    Main: "Region1",
  },
  Get: ({ target = null, typeId = null }) => {
    return async () => {
      var url = `${Controller.Urls.Main}?d=2`;
      url += target ? `&target=${target}` : "";
      url += typeId ? `&typeId=${typeId}` : "";
      return await Api.api_get(url);
    };
  },
  GetById: (id) => {
    return async () => {
      return await Api.api_get(`${Controller.Urls.Main}/${id}`);
    };
  },
  Post: (body) => {
    return async () => {
      return await Api.api_post(Controller.Urls.Main, body);
    };
  },
  Delete: (body) => {
    return async () => {
      return await Api.api_delete(Controller.Urls.Main, body);
    };
  },
};

export default Controller;
