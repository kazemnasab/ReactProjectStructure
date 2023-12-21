import * as Api from "providers/http/axios";

const Controller = {
  Urls: {
    Main: "Constant",
  },
  Get: ({
    target = null,
    wtarget = null,
  }) => {
    return async () => {
      var url = `${Controller.Urls.Main}?d=2`;
      url += target ? `&target=${target}` : "";
      url += wtarget ? `&wtarget=${wtarget}` : "";
      return await Api.api_get(url);
    };
  },
};

export default Controller;
