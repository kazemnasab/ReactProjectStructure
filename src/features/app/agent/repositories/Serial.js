import * as Api from "providers/http/axios";

const Controller = {
  Urls: {
    Main: "Serial",
  },
  Get: ({
    target = null,
    date = null,
    number = null,
  }) => {
    return async () => {
      var url = `${Controller.Urls.Main}?d=2`;
      url += target ? `&target=${target}` : "";
      url += date ? `&date=${date}` : "";
      url += number ? `&number=${number}` : "";
      return await Api.api_get(url);
    };
  },
};

export default Controller;
